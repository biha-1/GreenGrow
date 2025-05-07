
import { useState } from "react";
import { useData } from "../../context/DataContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreatePostForm = () => {
  const { addPost } = useData();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() && description.trim()) {
      addPost({
        title: title.trim(),
        image: image.trim() || undefined,
        description: description.trim(),
      });
      
      // Reset form
      setTitle("");
      setImage("");
      setDescription("");
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setImage("");
    setDescription("");
    setIsExpanded(false);
  };

  return (
    <Card className="mb-6 border-green-100 plant-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Share Your Plantation Journey</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isExpanded ? (
            <Textarea
              placeholder="What's on your mind about plants today?"
              className="resize-none border-green-200 focus-visible:ring-green-500"
              onFocus={() => setIsExpanded(true)}
            />
          ) : (
            <>
              <Input
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
              
              <Input
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
              
              <Textarea
                placeholder="Share your thoughts, tips, or questions about plantation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none border-green-200 focus-visible:ring-green-500"
                rows={3}
              />
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!title.trim() || !description.trim()}
                >
                  Post
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
