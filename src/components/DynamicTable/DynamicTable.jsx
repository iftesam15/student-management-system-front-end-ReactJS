import React from "react";
import { Button } from "react-bootstrap";
const DynamicTable = ({ columns, data, onEdit, onDelete, showActions }) => {
  return (
    <div className="main-container">
      <table className="table-container table-responsive">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.accessor]}</td>
              ))}
              {showActions && (
                <td>
                  <Button variant="primary" onClick={() => onEdit(row)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => onDelete(row)}>
                    Delete
                  </Button>{" "}
                  {/* <button onClick={() => onEdit(row)}>Edit</button>
                <button onClick={() => onDelete(row)}>Delete</button> */}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
