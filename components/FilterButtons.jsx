const FilterButtons = ({ data, handleFilterBtn }) => {
  return (
    <div className="flex gap-5 mt-16 ">
      <button
        onClick={handleFilterBtn}
        name="all"
        className="px-4 py-2 bg-gradient-to-tr from-yellow-400 to-yellow-600 text-white rounded"
      >
        All
      </button>
      <button
        onClick={handleFilterBtn}
        name="completed"
        className="px-4 py-2 bg-gradient-to-tr from-green-400 to-green-600 text-white rounded"
      >
        Completed
      </button>
      <button
        onClick={handleFilterBtn}
        name="active"
        className="px-4 py-2 bg-gradient-to-tr from-blue-400 to-blue-600 text-white rounded"
      >
        Active
      </button>
    </div>
  );
};

export default FilterButtons;
