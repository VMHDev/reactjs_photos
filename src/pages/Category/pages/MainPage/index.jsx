import React from 'react';
import Banner from 'components/Banner';
import Images from 'constants/images';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryTable from 'pages/Category/components/CategoryTable';

const tbody = [
  {
    className: "table-success",
    data: ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
  },
  {
    className: "",
    data: ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
  },
  {
    className: "table-info",
    data: ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
  },
  {
    className: "",
    data: ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
  },
  {
    className: "table-danger",
    data: ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
  },
  { className: "", data: ["Mason Porter", "Chile", "Gloucester", "$78,615"] },
  {
    className: "table-warning",
    data: ["Jon Porter", "Portugal", "Gloucester", "$98,615"],
  },
];

const MainPage = (props) => {

  //const categories = useSelector((state) => state.categories);

  const handleCategoryEditClick = (category) => {
    console.log('Edit: ', category);
  };

  const handleCategoryRemoveClick = (category) => {
    console.log('Remove: ', category);
  };

  return (
    <div className='photo-main text-right'>
      <Banner title='Your awesome photos 🎉' backgroundUrl={Images.PINK_BG} />

      <Container>
        <div className='py-5'>
          <Link to='/photos/add'>Add new photo</Link>
        </div>

        <CategoryTable
          categoryList={tbody}
          onCategoryEditClick={handleCategoryEditClick}
          onCategoryRemoveClick={handleCategoryRemoveClick}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
