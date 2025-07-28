import React, { useState } from "react";
import { Edit3, Check, X, Plus, Minus, Trash2, FileText } from "lucide-react";

interface BillDetailsProps {
  receipt: Receipt;
  onChange?: (updated: Receipt) => void;
}

const BillDetails: React.FC<BillDetailsProps> = ({ receipt, onChange }) => {
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editingTax, setEditingTax] = useState(false);
  const [tempItem, setTempItem] = useState<ReceiptItem | null>(null);
  const [tempTax, setTempTax] = useState("");

  const updateItem = (idx: number, updatedItem: ReceiptItem) => {
    const newItems = receipt.items.map((item, i) =>
      i === idx ? updatedItem : item
    );
    onChange?.({ ...receipt, items: newItems });
  };

  const removeItem = (idx: number) => {
    const newItems = receipt.items.filter((_, i) => i !== idx);
    onChange?.({ ...receipt, items: newItems });
  };

  const startEditingItem = (idx: number) => {
    setEditingItem(idx);
    setTempItem({ ...receipt.items[idx] });
  };

  const saveItemEdit = (idx: number) => {
    if (tempItem) {
      const updatedItem = {
        ...tempItem,
        unitPrice: tempItem.totalPrice / tempItem.quantity,
      };
      updateItem(idx, updatedItem);
    }
    setEditingItem(null);
    setTempItem(null);
  };

  const cancelItemEdit = () => {
    setEditingItem(null);
    setTempItem(null);
  };

  const updateTempItem = (field: keyof ReceiptItem, value: string | number) => {
    if (tempItem) {
      setTempItem({
        ...tempItem,
        [field]:
          field === "name"
            ? String(value)
            : Math.max(field === "quantity" ? 1 : 0, Number(value)),
      });
    }
  };

  const adjustTempQuantity = (delta: number) => {
    if (tempItem) {
      const newQty = Math.max(1, tempItem.quantity + delta);
      setTempItem({
        ...tempItem,
        quantity: newQty,
      });
    }
  };

  const startEditingTax = (tax: number) => {
    setEditingTax(true);
    setTempTax(tax.toString());
  };

  const saveTaxEdit = () => {
    onChange?.({ ...receipt, tax: Math.max(0, Number(tempTax)) });
    setEditingTax(false);
    setTempTax("");
  };

  const cancelTaxEdit = () => {
    setEditingTax(false);
    setTempTax("");
  };

  const subtotal = receipt.items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const grandTotal = subtotal + receipt.tax;

  return (
    <div className="max-w-2xl w-full mx-auto -mt-4">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-6 py-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText className="w-6 h-6 text-purple-300" />
            </div>
            {receipt.storeName}
          </h3>
          <p className="text-purple-200 text-sm ml-[3.35rem]">
            {receipt.items.length} items •{" "}
            {new Date(receipt.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {receipt.items.map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 border border-white/5 hover:border-white/20">
                  {editingItem === idx && tempItem ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <input
                          value={tempItem.name}
                          onChange={(e) =>
                            updateTempItem("name", e.target.value)
                          }
                          className="w-full px-4 py-2.5 bg-white/10 text-white rounded-lg border border-white/20 focus:border-purple-400 focus:bg-white/15 outline-none text-lg font-medium placeholder-white/50"
                          placeholder="Item name"
                          autoFocus
                        />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                            <button
                              onClick={() => adjustTempQuantity(-1)}
                              disabled={tempItem.quantity <= 1}
                              className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-5 h-5 text-purple-300" />
                            </button>
                            <div className="px-4 py-3 text-white font-semibold min-w-[3rem] text-center">
                              {tempItem.quantity}
                            </div>
                            <button
                              onClick={() => adjustTempQuantity(1)}
                              className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-5 h-5 text-purple-300" />
                            </button>
                          </div>

                          <div className="flex-1">
                            <input
                              min="0"
                              step="0.01"
                              value={tempItem.totalPrice}
                              onChange={(e) =>
                                updateTempItem("totalPrice", e.target.value)
                              }
                              className="w-full px-4 py-2.5 bg-white/10 text-white text-right rounded-lg border border-white/20 focus:border-purple-400 focus:bg-white/15 outline-none text-lg font-semibold"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => saveItemEdit(idx)}
                          className="flex-1 px-4 py-3 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg text-white transition-all duration-300 hover:brightness-110 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={cancelItemEdit}
                          className="flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/20 hover:border-white/30 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple-400/30">
                        <span className="text-white font-bold text-lg">
                          {item.quantity}×
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="text-white font-semibold text-lg">
                          {item.name}
                        </div>
                        <div className="text-purple-200 text-sm">
                          ${item.unitPrice.toFixed(2)} each
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-bold text-xl">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-3">
                        <button
                          onClick={() => startEditingItem(idx)}
                          className="p-2.5 rounded-lg bg-white/10 text-purple-300 hover:bg-white/20 hover:text-purple-200 transition-all duration-200 border border-white/10 hover:border-white/30 cursor-pointer"
                          title="Edit item"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(idx)}
                          className="p-2.5 rounded-lg bg-white/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-white/10 hover:border-red-400/30 cursor-pointer"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-white">
                <span className="font-semibold text-xl">Subtotal</span>
                <span className="font-bold text-xl">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-purple-200">
                <span className="font-semibold text-xl">Tax & Fees</span>
                <div className="flex items-center gap-2">
                  {editingTax ? (
                    <div className="flex items-center gap-2">
                      <input
                        min={0}
                        step="0.01"
                        value={tempTax}
                        onChange={(e) => setTempTax(e.target.value)}
                        className="w-24 px-3 py-2 bg-white/10 text-white text-right rounded-lg border border-purple-400 focus:border-purple-300 focus:bg-white/15 outline-none font-medium"
                        autoFocus
                        onKeyPress={(e) => e.key === "Enter" && saveTaxEdit()}
                      />
                      <button
                        onClick={saveTaxEdit}
                        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelTaxEdit}
                        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditingTax(receipt.tax)}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white/10 transition-colors group/tax cursor-pointer"
                    >
                      <span className="text-purple-200 font-semibold text-xl">
                        ${receipt.tax.toFixed(2)}
                      </span>
                      <Edit3 className="w-4 h-4 text-white opacity-60 group-hover/tax:opacity-100 transition-opacity" />
                    </button>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl text-white">Total</span>
                <span className="font-semibold text-xl bg-gradient-to-r text-white">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              Split Bill
            </button>
            <button className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-white transition-all duration-300 border border-white/20 hover:border-white/30 cursor-pointer">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
