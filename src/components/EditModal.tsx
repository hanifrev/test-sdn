import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  useGetOneUsersQuery,
  useUpdateUsersMutation,
} from "@/services/apiSlice";

const EditModal = ({
  closeModal,
  toastSuccess,
  idParams,
}: {
  closeModal: any;
  toastSuccess: any;
  idParams: any;
}) => {
  const [updateUsers, { isLoading, isSuccess, isError }] =
    useUpdateUsersMutation();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("Loading...");
  const [email, setEmail] = useState<string>("Loading...");
  const [role, setRole] = useState<string>("Loading...");
  //   const [title, setTitle] = useState<string>("Loading...");
  //   const [description, setDescription] = useState<string>("Loading...");

  const { data: oneData, refetch } = useGetOneUsersQuery(idParams);
  console.log(oneData && oneData);

  useEffect(() => {
    if (oneData) {
      setId(oneData.data._id);
      setName(oneData.data.name);
      setEmail(oneData.data.email);
    }
  }, [oneData, idParams]);

  useEffect(() => {
    refetch();
  }, [idParams]);

  const modalRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleUpdate = (e: any) => {
    e.preventDefault();
    updateUsers({ id, name, email });
    e.target.reset();
  };

  {
    isSuccess &&
      (() => {
        closeModal();
        toastSuccess();
      })();
  }

  return (
    <div id="add-form" className="text-white absolute" ref={modalRef}>
      {isLoading ? (
        <div className="font-bold h-[400px] flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form onSubmit={(e) => handleUpdate(e)}>
          <div className="max-w-xs m-auto">
            <h3 className="font-bold text-center py-3">EDIT TASK</h3>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
              // ref={inputRef}
            />
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="description"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Pick the date</span>
            </label>

            <button className="btn btn-primary px-16 w-full " type="submit">
              EDIT
            </button>
          </div>
        </form>
      )}

      {/* {isSuccess && <div>Post created successfully!</div>} */}
      {/* {isError && <div>Error creating post.</div>} */}
    </div>
  );
};

export default EditModal;
