import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetAllUsersQuery,
  useDeleteUsersMutation,
} from "@/services/apiSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import EditModal from "./EditModal";

const UsersTable = () => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>();
  const [toast, setToast] = useState<boolean>(false);

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

  const dispath = useDispatch();
  const getData: any = useGetAllUsersQuery();
  const thedata = getData.data && getData.data.data.docs;
  const data = thedata && [...thedata].reverse();

  useEffect(() => {
    if (data && data == null) {
      Cookies.remove("access_token");
      router.push("/Login");
    }
  }, []);

  const [deleteUsers, { isLoading, isSuccess, isError }] =
    useDeleteUsersMutation();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast]);

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
      {toast && (
        <div
          className="alert alert-success absolute max-w-[600px] z-30"
          style={{ left: "calc(50% - 600px / 2)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>User updated!</span>
        </div>
      )}
      <div className="flex justify-end w-[864px] mx-auto py-2">
        <button
          className="w-24 text-sm p-1 rounded-md text-white ml-6 info bg-green-500 hover:bg-green-400"
          // onClick={handleSignout}
        >
          ADD USER
        </button>
      </div>

      <div className="the-list flex justify-center">
        <table rules="all">
          <tr className="flex flex-row items-center text-sm table-head">
            {/* <th className="w-[60px] text-left pl-4">AVA</th> */}
            <th className="w-[142px] text-left pl-4">ID</th>
            <th className="w-[280px] text-left pl-4">EMAIL</th>
            <th className="w-[210px] text-left pl-4">NAME</th>
            <th className="w-[100px] text-left pl-4">ROLE</th>
            <th className="w-[130px] text-left justify-center">Action</th>
          </tr>

          <div>
            {data &&
              data.map((x: any) => {
                return (
                  <>
                    <tr className="flex flex-row items-center text-sm table-head">
                      {/* <td className="w-[60px] text-left pl-4">
                        {x.avatar ? (
                          <img className="w-12" src={x.avatar} />
                        ) : (
                          "No image"
                        )}
                      </td> */}
                      <td className="w-[142px] text-left pl-4 publicAdd">
                        {sliceString(x._id, 12)}
                      </td>
                      <td className="w-[280px] text-left pl-4">{x.email}</td>
                      <td className="w-[210px] text-left pl-4">{x.name}</td>
                      <td className="w-[100px] text-left pl-4">
                        {x.role.name}
                      </td>

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
                  </>
                );
              })}
          </div>
        </table>
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
