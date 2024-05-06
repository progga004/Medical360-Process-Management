import React from 'react';

const BugTable = ({ cards }) => {
  const fields = ['Name', 'Phone', 'Email', 'Bug'];

  return (
    <div className="overflow-x-auto relative">
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

export default BugTable;
