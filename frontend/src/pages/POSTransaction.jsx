import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TabNavigation from "../components/pos/TabNavigation";
import POSHeader from "../components/pos/POSHeader";
import POSTable from "../components/pos/POSTable";
import TransactionSummary from "../components/pos/TransactionSummary";
import ActionButtons from "../components/pos/ActionButtons";
import FullscreenWrapper from "../components/pos/FullscreenWrapper";

// Mock data for retail products (clothing and stationery)
const productList = [
  {
    id: 1,
    name: "Men's Cotton T-Shirt - Blue",
    size: "L",
    color: "Blue",
    price: 25.99,
  },
  {
    id: 2,
    name: "Women's Denim Jeans - Black",
    size: "32",
    color: "Black",
    price: 89.99,
  },
  { id: 3, name: "A4 Spiral Notebook - 200 Pages", price: 12.5 },
  { id: 4, name: "Ball Point Pen Set - Black (Pack of 10)", price: 8.99 },
  {
    id: 5,
    name: "Children's Hoodie - Red",
    size: "M",
    color: "Red",
    price: 35.0,
  },
  { id: 6, name: "Office Folder - Manila", price: 3.25 },
  {
    id: 7,
    name: "Women's Blouse - White",
    size: "S",
    color: "White",
    price: 45.99,
  },
  {
    id: 8,
    name: "Highlighter Set - Assorted Colors (Pack of 5)",
    price: 15.75,
  },
  {
    id: 9,
    name: "Men's Cargo Shorts - Khaki",
    size: "34",
    color: "Khaki",
    price: 42.5,
  },
  { id: 10, name: "Sticky Notes - Yellow (Pack of 12)", price: 6.99 },
  {
    id: 11,
    name: "Women's Summer Dress - Floral",
    size: "M",
    color: "Floral",
    price: 65.0,
  },
  { id: 12, name: "Stapler - Heavy Duty", price: 22.99 },
  {
    id: 13,
    name: "Children's School Uniform Shirt - White",
    size: "10",
    color: "White",
    price: 18.5,
  },
  { id: 14, name: "Correction Tape - White Out", price: 4.25 },
  {
    id: 15,
    name: "Men's Formal Shirt - Light Blue",
    size: "XL",
    color: "Light Blue",
    price: 55.0,
  },
];

// Transaction types
const transactionTypes = [
  { id: "quotation", name: "Quotation" },
  { id: "order", name: "Order" },
  { id: "sales", name: "Sales/POS" },
  { id: "returns", name: "Returns" },
];

const POSTransaction = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [invoiceNumber, setInvoiceNumber] = useState(
    "INV-" + Math.floor(Math.random() * 10000)
  );
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
    {
      id: uuidv4(),
      product: null,
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    },
  ]);

  // Update date/time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate subtotal, VAT, and grand total
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountTotal = items.reduce(
    (sum, item) => sum + (item.price * item.quantity * item.discount) / 100,
    0
  );
  const vat = subtotal * 0.15; // Assuming 15% VAT
  const grandTotal = subtotal + vat;

  // Add a new row
  const addNewRow = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        product: null,
        quantity: 1,
        price: 0,
        discount: 0,
        total: 0,
      },
    ]);
  };

  // Clear all items
  const clearTransaction = () => {
    setItems([
      {
        id: uuidv4(),
        product: null,
        quantity: 1,
        price: 0,
        discount: 0,
        total: 0,
      },
    ]);
    setInvoiceNumber("INV-" + Math.floor(Math.random() * 10000));
  };

  // Handle finalize sale
  const finalizeSale = () => {
    // Here you would typically send data to an API
    console.log({
      transactionType: activeTab,
      invoiceNumber,
      dateTime: currentDateTime,
      items,
      subtotal,
      discountTotal,
      vat,
      grandTotal,
    });

    // Clear for next transaction
    clearTransaction();
    alert(
      `${
        activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
      } completed successfully!`
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  return (
    <FullscreenWrapper
      activeTab={activeTab}
      transactionTypes={transactionTypes}
    >
      <div className="flex flex-col h-full font-lato pos-transaction">
        {/* Tab Navigation */}
        <TabNavigation
          transactionTypes={transactionTypes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Top Bar */}
        <POSHeader
          transactionTypes={transactionTypes}
          activeTab={activeTab}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
          invoiceNumber={invoiceNumber}
        />

        {/* Main POS Content */}
        <div className="flex-1 overflow-auto p-5 pos-scrollbar">
          <POSTable
            items={items}
            setItems={setItems}
            productList={productList}
            formatCurrency={formatCurrency}
            addNewRow={addNewRow}
          />

          {/* Transaction Summary */}
          <TransactionSummary
            subtotal={subtotal}
            discountTotal={discountTotal}
            vat={vat}
            grandTotal={grandTotal}
            formatCurrency={formatCurrency}
          />
        </div>

        {/* Bottom Bar */}
        <ActionButtons
          activeTab={activeTab}
          clearTransaction={clearTransaction}
          finalizeSale={finalizeSale}
        />
      </div>
    </FullscreenWrapper>
  );
};

export default POSTransaction;
