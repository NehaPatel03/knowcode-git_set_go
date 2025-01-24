import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  reviews: Array<{ rating: number; comment: string }>;
  currentOrders: Array<{
    company: string;
    quantity: number;
    completionDate: string;
  }>;
}

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const images = Array.from(formData.getAll("images") as File[]).map(file => 
      URL.createObjectURL(file)
    );

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      images,
      reviews: [],
      currentOrders: [],
    };

    setProducts([...products, newProduct]);
    toast({
      title: "Product Added",
      description: "Your product has been successfully added.",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Your product has been successfully deleted.",
    });
  };

  const handleEditProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, ...updatedData } : p
    ));
    toast({
      title: "Product Updated",
      description: "Your product has been successfully updated.",
    });
  };

  const handleImageNavigation = (productId: string, direction: 'prev' | 'next') => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const currentIndex = currentImageIndexes[productId] || 0;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % product.images.length
      : (currentIndex - 1 + product.images.length) % product.images.length;
    
    setCurrentImageIndexes({
      ...currentImageIndexes,
      [productId]: newIndex
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div>
                  <Label htmlFor="images">Images</Label>
                  <Input id="images" name="images" type="file" multiple accept="image/*" required />
                </div>
                <Button type="submit">Add Product</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md transition-all duration-300 ${
                hoveredProduct === product.id ? 'scale-105 z-10' : ''
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative">
                <img
                  src={product.images[currentImageIndexes[product.id] || 0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                  onClick={() => setSelectedImage(product.images[currentImageIndexes[product.id] || 0])}
                />
                {product.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleImageNavigation(product.id, 'prev')}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleImageNavigation(product.id, 'next')}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-primary font-bold">₹{product.price}</p>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>

                {hoveredProduct === product.id && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Reviews</h4>
                      {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            <span>★ {review.rating}</span>
                            <p>{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No reviews yet</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Current Orders</h4>
                      {product.currentOrders.length > 0 ? (
                        <div className="space-y-2">
                          {product.currentOrders.map((order, index) => (
                            <div key={index} className="text-sm">
                              <p>Company: {order.company}</p>
                              <p>Quantity: {order.quantity}</p>
                              <p>Completion: {order.completionDate}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No current orders</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          <form className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                defaultValue={product.name}
                                onChange={(e) =>
                                  handleEditProduct(product.id, { name: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-price">Price</Label>
                              <Input
                                id="edit-price"
                                type="number"
                                defaultValue={product.price}
                                onChange={(e) =>
                                  handleEditProduct(product.id, {
                                    price: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                defaultValue={product.description}
                                onChange={(e) =>
                                  handleEditProduct(product.id, {
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-images">Add More Images</Label>
                              <Input
                                id="edit-images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  const newImages = files.map((file) =>
                                    URL.createObjectURL(file)
                                  );
                                  handleEditProduct(product.id, {
                                    images: [...product.images, ...newImages],
                                  });
                                }}
                              />
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-[90%] max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;