import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyDetails {
  name: string;
  description: string;
  category: string;
  contactPerson: string;
}

export const CompanyProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<CompanyDetails>({
    name: "Tech Solutions Ltd",
    description: "Leading technology solutions provider",
    category: "Technology",
    contactPerson: "John Doe",
  });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDetails = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      contactPerson: formData.get("contactPerson") as string,
    };
    setDetails(newDetails);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold">Company Profile</h2>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Company Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" name="name" defaultValue={details.name} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={details.description}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={details.category} />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  defaultValue={details.contactPerson}
                />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Company Name</h3>
          <p>{details.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
          <p>{details.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
          <p>{details.category}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
          <p>{details.contactPerson}</p>
        </div>
      </div>
    </div>
  );
};