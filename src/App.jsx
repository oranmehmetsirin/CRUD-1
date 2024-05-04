import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from "react-toastify";
import EditModal from "./components/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn("Please Enter a Book Name", { autoClose: 2500 });
      return;
    }

    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    setBooks([...books, newBook]);

    setBookName("");

    toast.success("Book Added", { autoClose: 2500 });
  };

  const handleModal = (id) => {
    setDeleteId(id);

    setShowConfirm(true);
  };

  const handleDelete = (deletingId) => {
    const filtred = books.filter((item) => item.id !== deletingId);

    setBooks(filtred);

    toast.error("Book Deleted", { autoClose: 2500 });
  };

  const handleRead = (book) => {
    const updatedBook = { ...book, isRead: !book.isRead };
    const cloneBooks = [...books];
    const index = cloneBooks.findIndex((item) => item.id === book.id);

    cloneBooks.splice(index, 1, updatedBook);

    setBooks(cloneBooks);
  };

  const handleEditBook = () => {
    const index = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(index, 1, editItem);

    setBooks(cloneBooks);

    setShowEditModal(false);
  };

  return (
    <div className="App">
      <div className="bg-dark text-light px-6 py-3 fs-3 text-center fw-bolder">
        BookWorm
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-5 py-4">
          <input
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-success fw-bold shadow">Add</button>
        </form>
        <div className="d-flex flex-column gap-4 py-4">
          {books.length === 0 && (
            <h4 className="text-danger mt-2">No Books Added Yet</h4>
          )}
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
            <h5>Do You Want to Delete?</h5>
            <button
              className="btn btn-warning fw-bold m-2"
              onClick={() => setShowConfirm(false)}
            >
              Back
            </button>
            <button
              className="btn btn-danger fw-bold m-2"
              onClick={() => {
                handleDelete(deleteId);
                setShowConfirm(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
          editItem={editItem}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
