import { useState, useEffect } from "react";
import { Table, Input,Skeleton, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import styles from "./style.module.scss";

import config from "../../config";
import { getVehicleEntry } from "../../redux/actions/vehicleEntry";
import PageHeader from "../../components/PageHeader";
import VehicleList from "./VehicleList"
const {Search} = Input;

const UnverifiedList = () => {
 
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = config.paging.perPage;
  const { entries, paging, listLoading } = useSelector((state: any) => state.vehicleEntries)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getVehicleEntry({ offset, limit: perPage }));
  }, [dispatch, offset, perPage])

  const changePage = (page: number) => {
    const newOffset = (page - 1) * perPage;
    setOffset(newOffset);
    setCurrentPage(page);
  }

  
  const columns = [
    {
      title: "S.N",
      render: (record: any, re: any, index: number) => {
        return <>{offset + index + 1}</>;
      },
    },
    {
      title: "Reg No",
      dataIndex: "bhansar_rasid_number",
      key: "importing_group",
      sorter:(a:any,b:any)=>a.bhansar_rasid_number - b.bhansar_rasid_number,
      ellipsis: true,
    },
    {
      title: "Reg Date",
      dataIndex: "registered_at",
      key: "registered_at",
      sorter:(a:any,b:any)=>moment(a.registered_at).unix() - moment(b.registered_at).unix(),
      ellipsis: true,

    },
    {
      title: "Reg by",
      dataIndex: "importing_group",
      key: "importing_group",
      sorter:(a:any,b:any)=>a.importing_group - b.importing_group,
      ellipsis: true,
    },
    {
      title: "Manufactured year",
      dataIndex: "manufactured_year",
      key: "manufactured_year",
      sorter: {
        compare: (a: any, b: any) => a.manufactured_year - b.manufactured_year,
      },
      ellipsis:true
    },
    {
      title: "Pargayapan no",
      dataIndex: "gyapan_patra_number",
      key: "gyapan_patra_number",
      sorter:(a:any,b:any)=>a.gyapan_patra_number - b.gyapan_patra_number,
      ellipsis:true
    },
    {
      title: "No of import",
      dataIndex: "number_of_imports",
      key: "number_of_imports",
      sorter:(a:any,b:any)=>a.number_of_imports - b.number_of_imports,
      ellipsis:true
    },
  ];

  const onSearch =(vehicleId:string)=>{
    console.log(vehicleId)
  }

  return (
    <>
      <PageHeader title="Unverified Vehicles" />
      <div className={styles["search-container"]}>
      <Search className={styles.search__input} placeholder="Enter Vehicle Id" onSearch={onSearch} enterButton />
      </div>
      { (listLoading && !entries.length) ?
        <Skeleton /> :
        <Table
          columns={columns}
          dataSource={entries}
          rowKey={(v) => v.uuid}
          expandable={{
            expandedRowRender: (record) =>
              <VehicleList vehicleEntryUuid={record.uuid} />
          }}
        />
      }
         {
        (paging?.next || paging?.previous) && 
          <div className={styles['pagination']}>
            <Pagination current={currentPage} onChange={changePage} total={paging?.count} pageSize={perPage}/>
          </div>
      }
    </>
  );
};

export default UnverifiedList;
