
import { formatDistanceToNow } from "date-fns";
import { LearningMaterial } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2, FileText, Link } from "lucide-react";

interface MaterialCardProps {
  material: LearningMaterial;
}

const MaterialCard = ({ material }: MaterialCardProps) => {
  const { currentUser } = useAuth();
  const { deleteLearningMaterial } = useData();
  
  const isOwnMaterial = currentUser && material.userId === currentUser.id;

  const handleDelete = () => {
    if (!isOwnMaterial) return;
    deleteLearningMaterial(material.id);
  };

  return (
    <Card className="mb-6 overflow-hidden plant-card border-green-100">
      <div className="flex items-center justify-between p-4 border-b border-green-100">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={material.userProfileImage} alt={material.username} />
            <AvatarFallback>{material.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{material.username}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(material.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        {isOwnMaterial && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-red-500"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          {material.fileType === 'pdf' ? (
            <FileText className="h-5 w-5 text-red-500" />
          ) : (
            <Link className="h-5 w-5 text-blue-500" />
          )}
          <h3 className="font-semibold text-lg">{material.title}</h3>
        </div>
        
        <p className="text-gray-700 mb-4">{material.description}</p>
        
        <Button 
          variant="outline" 
          className="w-full border-green-200 hover:bg-green-50 hover:text-green-700"
          onClick={() => window.open(material.fileUrl, '_blank')}
        >
          {material.fileType === 'pdf' ? 'Open PDF' : 'Open Link'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
