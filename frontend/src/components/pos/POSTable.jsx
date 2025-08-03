import React, { useRef } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import "./handsontable-custom.css";

// Register Handsontable's modules
registerAllModules();

const POSTable = ({
  items,
  setItems,
  productList,
  formatCurrency,
  addNewRow,
}) => {
  const hotTableRef = useRef(null);

  // Convert items to data format for Handsontable
  const tableData = items.map((item) => [
    item.product ? item.product.name : "",
    item.quantity,
    item.price,
    item.discount,
    item.total,
  ]);

  // Add empty rows if needed
  while (tableData.length < 10) {
    tableData.push(["", 1, 0, 0, 0]);
  }

  const columns = [
    {
      data: 0,
      title: "Product",
      type: "autocomplete",
      source: productList.map((p) => p.name),
      strict: false,
      allowInvalid: false,
      width: 300,
      renderer: function (instance, td, row, col, prop, value) {
        // Only show the product title/name
        td.innerHTML = `<div class="font-medium">${value || ""}</div>`;
        td.className = "htMiddle htLeft";
      },
    },
    {
      data: 1,
      title: "Qty",
      type: "numeric",
      numericFormat: {
        pattern: "0",
      },
      width: 80,
    },
    {
      data: 2,
      title: "Price",
      type: "numeric",
      numericFormat: {
        pattern: "0.00",
      },
      width: 100,
      renderer: function (instance, td, row, col, prop, value) {
        td.innerHTML = formatCurrency(value || 0);
        td.className = "htMiddle htRight";
      },
    },
    {
      data: 3,
      title: "Discount %",
      type: "numeric",
      numericFormat: {
        pattern: "0.00",
      },
      width: 100,
    },
    {
      data: 4,
      title: "Total",
      type: "numeric",
      readOnly: true,
      width: 120,
      renderer: function (instance, td, row, col, prop, value) {
        td.innerHTML = `<strong>${formatCurrency(value || 0)}</strong>`;
        td.className = "htMiddle htRight bg-gray-50";
      },
    },
  ];

  const handleAfterChange = (changes, source) => {
    if (source === "loadData") return;

    changes?.forEach(([row, prop, , newValue]) => {
      if (row >= items.length) {
        // Add new rows if needed
        const newItems = [...items];
        while (newItems.length <= row) {
          newItems.push({
            id: Date.now() + Math.random(),
            product: null,
            quantity: 1,
            price: 0,
            discount: 0,
            total: 0,
          });
        }
        setItems(newItems);
      }

      const newItems = [...items];
      const item = newItems[row] || {
        id: Date.now() + Math.random(),
        product: null,
        quantity: 1,
        price: 0,
        discount: 0,
        total: 0,
      };

      if (prop === 0) {
        // Product column
        const product = productList.find((p) => p.name === newValue);
        if (product) {
          item.product = product;
          item.price = product.price;
        } else {
          item.product = null;
        }
      } else if (prop === 1) {
        // Quantity
        item.quantity = Math.max(1, parseInt(newValue) || 1);
      } else if (prop === 2) {
        // Price
        item.price = Math.max(0, parseFloat(newValue) || 0);
      } else if (prop === 3) {
        // Discount
        item.discount = Math.min(100, Math.max(0, parseFloat(newValue) || 0));
      }

      // Recalculate total
      item.total = item.price * item.quantity * (1 - item.discount / 100);

      newItems[row] = item;
      setItems(newItems);
    });
  };

  const hotSettings = {
    data: tableData,
    columns: columns,
    stretchH: "all",
    width: "100%",
    height: 400,
    licenseKey: "non-commercial-and-evaluation",
    contextMenu: ["row_above", "row_below", "remove_row"],
    manualRowResize: true,
    manualColumnResize: true,
    rowHeaders: true,
    colHeaders: true,
    dropdownMenu: true,
    filters: false,
    columnSorting: false,
    afterChange: handleAfterChange,
    className: "pos-handsontable",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Transaction Items
        </h3>
        <button
          onClick={addNewRow}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
        >
          <span>+ Add Row</span>
        </button>
      </div>

      <HotTable ref={hotTableRef} settings={hotSettings} />
    </div>
  );
};

export default POSTable;
