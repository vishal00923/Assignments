import { Main } from '@/components/Main';
import { useState } from 'react';
import { initialData } from '@/data';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
  const [data, setData] = useState(initialData);

  const reorderColumnList = (sourceColumn, startIndex, endIndex) => {
    const newCandidateIds = Array.from(sourceColumn.candidateIds);
    const [removed] = newCandidateIds.splice(startIndex, 1);
    newCandidateIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceColumn,
      candidateIds: newCandidateIds,
    };

    return newColumn;
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // if the user try to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // if the user drops within the same column but in a different position
    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    if (sourceColumn.id === destinationColumn.id) {
      const newColumn = reorderColumnList(
        sourceColumn,
        source.index,
        destination.index
      );

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newData);
      return;
    }

    // if the user drags from one column to other
    const startCandidateIds = Array.from(sourceColumn.candidateIds);
    const [removed] = startCandidateIds.splice(source.index, 1);
    const newStartColumn = {
      ...sourceColumn,
      candidateIds: startCandidateIds,
    };
    const endCandidateIds = Array.from(destinationColumn.candidateIds);
    endCandidateIds.splice(destination.index, 0, removed);
    const newEndColumn = {
      ...destinationColumn,
      candidateIds: endCandidateIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='app'>
        <Main data={data} setData={setData} />
      </div>
    </DragDropContext>
  );
};

export default App;
