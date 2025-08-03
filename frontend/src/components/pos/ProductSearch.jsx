import React from "react";
import { Search } from "lucide-react";

const ProductSearch = ({
  item,
  searchTerm,
  setSearchTerm,
  showProductSearch,
  setShowProductSearch,
  filteredProducts,
  handleSelectProduct,
  activeItemId,
  setActiveItemId,
  formatCurrency,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        data-item-id={item.id}
        data-field="product"
        className="w-full px-3 py-2 border rounded-md pos-input focus:ring-2 focus:ring-[#2a843f] focus:border-transparent"
        placeholder="Search product..."
        value={item.product ? item.product.name : searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowProductSearch(true);
          setActiveItemId(item.id);
        }}
        onFocus={() => {
          setActiveItemId(item.id);
          if (!item.product) {
            setShowProductSearch(true);
          }
        }}
      />
      <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />

      {showProductSearch && activeItemId === item.id && (
        <div className="absolute z-10 w-full bg-white mt-1 border rounded-md shadow-lg max-h-60 overflow-auto pos-scrollbar">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectProduct(product, item.id)}
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{formatCurrency(product.price)}</span>
                  {(product.size || product.color) && (
                    <span>
                      {product.size && `Size: ${product.size}`}
                      {product.size && product.color && " | "}
                      {product.color && `Color: ${product.color}`}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
