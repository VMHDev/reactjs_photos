import React from 'react';
import PropTypes from 'prop-types';
import { BsPlus, BsX } from "react-icons/bs";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

const thead = ["Name", "Country", "City", "Salary", "Delete"];

const CategoryTable = (props) => {
  const { categoryList, onCategoryEditClick, onCategoryRemoveClick } = props;

  return (
    <div className='content'>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <CardTitle tag='h4' className='text-center'>List Categories</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className='text-primary'>
                  <tr>
                    {thead.map((prop, key) => {
                      if (key === thead.length - 1)
                        return (
                          <th key={key} className='text-center'>
                            {prop}
                          </th>
                        );
                      return <th key={key}>{prop}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {categoryList.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {prop.data.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <td key={key} className='text-right'>
                                {prop}
                              </td>
                            );
                          return <td key={key}>{prop}</td>;
                        })}
                        <td className='text-center'><Button  color="danger"><BsX/></Button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

CategoryTable.propTypes = {
  categoryList: PropTypes.array,
  onCategoryEditClick: PropTypes.func,
  onCategoryRemoveClick: PropTypes.func,
};

CategoryTable.defaultProps = {
  categoryList: [],
  onCategoryEditClick: null,
  onCategoryRemoveClick: null,
};

export default CategoryTable;
