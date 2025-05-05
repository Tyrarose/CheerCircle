import React, { FC } from 'react';
import IconAndText from './IconAndText';

interface ColumnData {
  text: string;
  icon?: string;
  color?: string;
}

interface BottomRowProps {
  col1: ColumnData;
  col2: ColumnData;
  col3: ColumnData;
  col4: ColumnData;
}

const BottomRow: FC<BottomRowProps> = ({ col1, col2, col3, col4 }) => {
  return (
    <div className="flex bg-yellow-five p-6">
      <div className="flex-1 flex items-center justify-center">
        <IconAndText icon={col1.icon} label={col1.text} color={col1.color} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <IconAndText icon={col2.icon} label={col2.text} color={col2.color} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <IconAndText icon={col3.icon} label={col3.text} color={col3.color} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <IconAndText icon={col4.icon} label={col4.text} color={col4.color} />
      </div>
    </div>
  );
};

export default BottomRow;