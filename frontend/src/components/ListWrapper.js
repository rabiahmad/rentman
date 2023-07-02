import React from "react";

const ListWrapper = (props) => {
  const { children, endpoint } = props;

  const { refreshList, completeRefresh } = useContext(ItemContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [refreshList]);

  const getItems = async () => {
    try {
      const response = await fetch({ endpoint });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Error fetching items. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      completeRefresh();
    }
  };

  return (
    <div>
      <div className="list-container">
        <ul className="list-group list-group-flush">
          {items.map((item, index) => (
            <li key={index} className="list-group-item">
              <DeleteItem itemId={item.id} />
              {children}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListWrapper;
