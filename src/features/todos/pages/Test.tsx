import {useState} from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

export function SortableItem(props: {id: number}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.id})

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  )
}

const Test = () => {
  const [items, setItems] = useState([1, 2, 3])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div style={{width: 600}}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map(id => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event

    if (active.id !== over?.id) {
      setItems(items => {
        const oldIndex = items.indexOf(Number(active.id))
        const newIndex = items.indexOf(Number(over?.id))

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}

export default Test
