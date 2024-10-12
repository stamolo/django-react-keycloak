import React, { useState } from 'react';

const EditableCell = ({ value, field, onCellChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");  // Инициализируем пустой строкой

  const handleBlur = () => {
    setIsEditing(false);
    if (currentValue !== value) {
      onCellChange(field, currentValue);  // Отправляем изменения родителю
    }
  };

  console.log("EditableCell value:", currentValue);  // Отладка значения в ячейке

  return (
    <td onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        currentValue
      )}
    </td>
  );
};

export default EditableCell;
