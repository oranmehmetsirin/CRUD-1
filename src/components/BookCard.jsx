const BookCard = ({
  book,
  handleDelete,
  handleRead,
  handleModal,
  setEditItem,
  setShowEditModal,
}) => {
  return (
    <div className="d-flex border shadow p-4 justify-content-between align-items-center">
      <div>
        <h5
          style={{
            textDecoration: book.isRead ? "line-through" : "none",
          }}
        >
          {book.title}
        </h5>
        <p>{book.date}</p>
      </div>
      <div className="btn-group">
      <button
          className="btn btn-success fw-bold"
          onClick={() => handleRead(book)}
        >
          {book.isRead ? "On the List" : "Completed"}
        </button>
        <button
          className="btn btn-warning fw-bold"
          onClick={() => {
            setEditItem(book);
            setShowEditModal(true);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger fw-bold"
          onClick={() => handleModal(book.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
