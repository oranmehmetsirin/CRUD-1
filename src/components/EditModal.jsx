const EditModal = ({
  setShowEditModal,
  setEditItem,
  editItem,
  handleEditBook,
}) => {
  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Edit Book Name</h5>

        <input
          value={editItem.title}
          type="text"
          className="form-control shadow"
          onChange={(e) =>
            setEditItem({
              ...editItem,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
        />
        <div className="d-flex justify-content-around mt-3">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Back
          </button>
          <button className="btn btn-success" onClick={handleEditBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
