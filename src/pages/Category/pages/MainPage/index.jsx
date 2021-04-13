import React from 'react';
import { useSelector } from 'react-redux';
import Banner from 'components/Banner';
import Images from 'constants/images';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { BsX, BsPencil } from "react-icons/bs";

// GUI column Edit
const editFormatter = (cell, row, rowIndex, formatExtraData) => {
  const iconStyles = { color: "white", fontSize: "1.5em" };

  return (
    <div
      style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal' }}>
      <Button style={{ fontSize: 12 }} color='success'><BsPencil style={iconStyles}/></Button>
    </div>
  );
};
// GUI column Delete
const deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
  const iconStyles = { color: "white", fontSize: "2.0em" };

  return (
    <div
      style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal' }}>
      <Button style={{ fontSize: 10}} color="danger"><BsX style={iconStyles}/></Button>
    </div>
  );
};
// Init Structe table
const columns = [
  {
    dataField: 'id',
    text: 'Category ID',
    Cell: (row) => (
      <div>
        <span title={row.value}>{row.value}</span>
      </div>
    ),
  },
  {
    dataField: 'name',
    text: 'Category Name',
  },
  {
    dataField: 'edit',
    text: 'Edit',
    sort: false,
    formatter: editFormatter,
    headerAttrs: { width: 80 },
    attrs: { width: 80 },
  },
  {
    dataField: 'delete',
    text: 'Delete',
    sort: false,
    formatter: deleteFormatter,
    headerAttrs: { width: 80 },
    attrs: { width: 80 },
  },
];
// Config pagination
const options = {
  sizePerPage: 5,
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
};

const MainPage = (props) => {
  const categories = useSelector((state) => state.categories);

  return (
    <div className='photo-main text-right'>
      <Banner title='Your awesome photos 🎉' backgroundUrl={Images.PINK_BG} />

      <Container>
        <div className='py-5'>
          <Link to='/categories/add'>Add new category</Link>
        </div>
        <BootstrapTable
          headerWrapperClasses='text-center'
          bodyClasses='text-left'
          keyField='id'
          data={categories}
          columns={columns}
          pagination={paginationFactory(options)}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
