import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  Code,
  Image,
  FileText,
  Settings,
  Database,
  Globe,
  Package,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { FileNode } from '../types';

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
  onEdit?: (node: FileNode) => void;
  onDelete?: (nodeId: string) => void;
  onAddChild?: (parentNode: FileNode) => void;
}

const getFileIcon = (node: FileNode) => {
  if (node.type === 'folder') {
    return node.children && node.children.length > 0 ? FolderOpen : Folder;
  }

  const extension = node.extension?.toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'vue':
    case 'py':
    case 'java':
    case 'cpp':
    case 'c':
      return Code;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return Image;
    case 'md':
    case 'txt':
    case 'doc':
    case 'docx':
      return FileText;
    case 'json':
    case 'xml':
    case 'yml':
    case 'yaml':
      return Settings;
    case 'sql':
    case 'db':
      return Database;
    case 'html':
    case 'css':
    case 'scss':
      return Globe;
    default:
      return File;
  }
};

const getFileColor = (node: FileNode) => {
  if (node.type === 'folder') {
    return 'text-blue-600';
  }

  const extension = node.extension?.toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'text-yellow-600';
    case 'ts':
    case 'tsx':
      return 'text-blue-600';
    case 'vue':
      return 'text-green-600';
    case 'py':
      return 'text-green-700';
    case 'html':
      return 'text-orange-600';
    case 'css':
    case 'scss':
      return 'text-pink-600';
    case 'json':
      return 'text-yellow-700';
    case 'md':
      return 'text-gray-600';
    default:
      return 'text-gray-500';
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'modified':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'created':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function FileTreeNode({ node, level, onEdit, onDelete, onAddChild }: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const [showActions, setShowActions] = useState(false);

  const IconComponent = getFileIcon(node);
  const iconColor = getFileColor(node);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(node);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${node.name}"?`)) {
      onDelete?.(node.id);
    }
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddChild?.(node);
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-all duration-200`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleToggle}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-center flex-1 min-w-0">
          {node.type === 'folder' && (
            <div className="mr-1 flex-shrink-0">
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </div>
          )}
          
          <IconComponent className={`h-4 w-4 mr-2 flex-shrink-0 ${iconColor}`} />
          
          <span className="text-sm text-gray-900 truncate flex-1">
            {node.name}
          </span>

          {node.status && (
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusColor(node.status)}`}>
              {node.status === 'completed' && 'Completado'}
              {node.status === 'modified' && 'Modificado'}
              {node.status === 'pending' && 'Pendiente'}
              {node.status === 'created' && 'Creado'}
            </span>
          )}

          {node.size && (
            <span className="ml-2 text-xs text-gray-400">
              {node.size < 1024 ? `${node.size}B` : `${Math.round(node.size / 1024)}KB`}
            </span>
          )}
        </div>

        {showActions && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {node.type === 'folder' && (
              <button
                onClick={handleAddChild}
                className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-all duration-200"
                title="Agregar archivo/carpeta"
              >
                <Plus className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
              title="Editar"
            >
              <Edit className="h-3 w-3" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
              title="Eliminar"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {node.description && (
        <div 
          className="text-xs text-gray-500 italic ml-2 mb-1"
          style={{ paddingLeft: `${level * 20 + 32}px` }}
        >
          {node.description}
        </div>
      )}

      {node.type === 'folder' && isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}