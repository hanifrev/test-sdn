import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetAllUsersQuery,
  useDeleteUsersMutation,
} from "@/services/apiSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Cookies from "js-cookie";
import EditModal from "./EditModal";
import Toast from "./Toast";
import AddModal from "./AddModal";

const UsersTable = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>();
  const [toast, setToast] = useState<boolean>(false);
  const [toastAdd, setToastAdd] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const { name, email } = useSelector((state: RootState) => state.userInfo);

  function sliceString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }

    const sliceLength = Math.floor((maxLength - 3) / 2);
    const startSlice = str.slice(0, sliceLength);
    const endSlice = str.slice(-sliceLength);

    return `${startSlice}...${endSlice}`;
  }

  const router = useRouter();

  const getData: any = useGetAllUsersQuery(page);
  const thedata = getData.data && getData.data.data.docs;
  const data = thedata;

  const username = Cookies.get("username");

  // useEffect(() => {
  //   if (getData.error.status == 401 && getData.error.status == 401) {
  //     Cookies.remove("access_token");
  //     router.push("/Login");
  //   }
  // }, []);

  const [deleteUsers, { isLoading, isSuccess, isError }] =
    useDeleteUsersMutation();

  useEffect(() => {
    if (toast || toastAdd) {
      const timer = setTimeout(() => {
        setToast(false);
        setToastAdd(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast, toastAdd]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const timer = setTimeout(() => {
  //       isSuccess;
  //     }, 2000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [isSuccess]);

  const handleDelete = (e: any, id: string) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>

            <button
              onClick={() => {
                deleteUsers(id);
                onClose();
              }}
              className="signout-btn"
            >
              Delete
            </button>
            <button onClick={onClose} className="cancels-btn">
              Cancel
            </button>
          </div>
        );
      },
    });
  };

  return (
    <div id="users-table">
      {toast && <Toast message="updated!" />}
      {toastAdd && <Toast message="added, check latest pages" />}
      {/* {isSuccess && <Toast message="deleted!" />} */}
      <div className="flex justify-between w-[1077px] mx-auto py-2">
        <div>Welcome {name ? name : username}</div>
        <button
          className="w-24 text-sm p-1 rounded-md text-white ml-6 info bg-green-500 hover:bg-green-400"
          onClick={() => setModal(true)}
        >
          ADD USER
        </button>
        {modal && (
          <AddModal
            toastSuccess={() => setToastAdd(true)}
            closeModal={() => setModal(false)}
          />
        )}
      </div>

      <div className="the-list flex justify-center">
        <table rules="all" className="mb-1">
          <thead>
            <tr className="flex flex-row items-center text-sm table-head">
              <th className="w-[50px] text-left pl-2">AVA</th>
              <th className="w-[115px] text-left pl-4">ID</th>
              <th className="w-[260px] text-left pl-4">EMAIL</th>
              <th className="w-[210px] text-left pl-4">NAME</th>
              <th className="w-[210px] text-left pl-4">BIO</th>
              <th className="w-[100px] text-left pl-4">ROLE</th>
              <th className="w-[130px] text-left justify-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((x: any, index: string) => {
                return (
                  <tr
                    className="flex flex-row items-center text-sm table-head"
                    key={index}
                  >
                    <td className="w-[50px] text-left ">
                      {x.avatar ? (
                        <img className="w-12 rounded-[50%]" src={x.avatar} />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="w-[115px] text-left pl-4 publicAdd">
                      {sliceString(x._id, 12)}
                    </td>
                    <td className="w-[260px] text-left pl-4">{x.email}</td>
                    <td className="w-[210px] text-left pl-4">{x.name}</td>
                    <td className="w-[210px] text-left pl-4 flex-wrap">
                      {`${x.bio ? x.bio.slice(0, 40) : ""}`}
                    </td>
                    <td className="w-[100px] text-left pl-4">{x.role.name}</td>

                    <td className="w-[130px] justify-around flex flex-row">
                      <button
                        onClick={() => {
                          setEditModal(true), setIdEdit(x._id);
                        }}
                        className="bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-md text-white"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, x._id)}
                        className="bg-red-500 hover:bg-red-400 px-2 py-1 rounded-md text-white"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="pt-4 pb-12 join w-[1077px] mx-auto font-bold text-white text-lg flex flex-row justify-end">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="join-item btn btn-outline"
        >
          Prev
        </button>

        <button
          // disabled={page = page.length}
          onClick={() => setPage((prev) => prev + 1)}
          className="join-item btn btn-outline"
        >
          Next
        </button>
      </div>
      {editModal && (
        <EditModal
          closeModal={() => setEditModal(false)}
          idParams={idEdit}
          toastSuccess={() => setToast(true)}
        />
      )}
    </div>
  );
};

export default UsersTable;
