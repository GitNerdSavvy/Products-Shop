import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [], 
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all the fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Error creating product" };
      }

      const data = await res.json();
      // Make sure to update `products` and that it is an array
      set((state) => ({ products: [...state.products , data.data] })); // Ensure state.products is an array before spreading

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Network or server error" };
    }
  },
  fetchProducts:async()=>{
    const res=await fetch("/api/products");
    const data=await res.json();
    set({products:data.data});
  },
  deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
  updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},

}));