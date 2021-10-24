import React from "react";
import Loading from "../../shared/Loading/Loading";
const AddSongsForm = function ({
  userState,
  uploadFiles,
  fileRef,
  showLoading,
}) {
  return (
    <>
      <form
        method="post"
        encType="multipart/form-data"
        className="add-music"
        onSubmit={(e) => {
          if (userState) {
            uploadFiles(e);
          }
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          multiple
          disabled={userState ? false : true}
        ></input>
        {showLoading ? <Loading /> : null}

        <button
          type="submit"
          className="button-style"
          disabled={userState ? false : true}
        >
          Add songs
        </button>
      </form>
    </>
  );
};
export default AddSongsForm;
