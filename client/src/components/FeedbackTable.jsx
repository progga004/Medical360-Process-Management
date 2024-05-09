import React from "react";
import { useNavigate } from "react-router-dom";

const FeedbackTable = ({ cards }) => {
  const navigate = useNavigate();
  const fields = ["Name", "Email", "Rating", "Comments"];

  const viewFeedbackDetails = (feedbackId) => {
    navigate(`/view-feedback/${feedbackId}`);
  };

  return (
    <div className="overflow-x-auto relative" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <table className="min-w-full">
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-300'}`}
              onClick={() => viewFeedbackDetails(card._id)} 
              style={{ cursor: 'pointer' }} 
            >
              {fields.map((field, i) => (
                <td
                  key={i}
                  className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {card[field.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
