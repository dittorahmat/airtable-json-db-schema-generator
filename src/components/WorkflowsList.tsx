import React from 'react';

interface WorkflowsListProps {
  workflows: { entity: string; workflows: string[] }[];
}

const WorkflowsList: React.FC<WorkflowsListProps> = ({ workflows }) => {
  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold mb-2">Workflows</h3>
        <ul className="list-disc list-inside text-sm">
          {workflows.map((workflow, index) => (
            <li key={index}>
              <h4 className="font-semibold">{workflow.entity}</h4>
              <ul className="list-disc list-inside">
                {workflow.workflows.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkflowsList;