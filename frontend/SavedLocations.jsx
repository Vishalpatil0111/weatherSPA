import React from "react";
import { Edit2, Trash2, Save, X, Star } from "lucide-react";

const SavedLocations = ({
  savedLocations,
  editingId,
  editName,
  onEditChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Star className="text-yellow-500" size={24} /> Saved Locations
      </h2>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {savedLocations.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved locations yet.</p>
        ) : (
          savedLocations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              {editingId === loc.id ? (
                <input
                  value={editName}
                  onChange={(e) => onEditChange(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded mr-2"
                />
              ) : (
                <div onClick={() => onSelect(loc)} className="flex-1 cursor-pointer">
                  <p className="font-semibold">{loc.name}</p>
                  <p className="text-xs text-gray-500">{loc.lat}, {loc.lon}</p>
                </div>
              )}

              <div className="flex gap-2">
                {editingId === loc.id ? (
                  <>
                    <button onClick={() => onSaveEdit(loc.id)} className="p-2 text-green-600 hover:bg-green-50 rounded"><Save size={18} /></button>
                    <button onClick={onCancelEdit} className="p-2 text-gray-600 hover:bg-gray-100 rounded"><X size={18} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => onStartEdit(loc)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                    <button onClick={() => onDelete(loc.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedLocations;
