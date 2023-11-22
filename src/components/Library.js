import React, { useEffect, useState } from "react"; 
import Papa from "papaparse"; //import external library
import _ from 'lodash'; //import external library

// top-level Library component
//   <LibraryDescription/>
//   <RoastSelectForm/>
//   <CoffeeTable />

export function Library(props) {

    // Libary-level state variables
    const [coffeeData, setCoffeeData] = useState([]);
    const [selectedRoast, setSelectedRoast] = useState('');

    // callback function to apply filters
    const applyFilter = (roast) => {
        setSelectedRoast(roast);
    }

    // attempt to find unique roast names. Gave up after a bug and hardcoded names below.
    const uniqueRoastNames = [...new Set(coffeeData.reduce((all, current) => {
        return all.concat([current.roast]);
      }, []))].sort();

    const uniqueRoastNamesHC = ["Dark", "Light", "Medium", "Medium-Dark", "Medium-Light"];
  
    // This import function was found online. Transforms csv prop to an array of key:value pairs
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(props.data);
        const result = await response.text();
        setCoffeeData(Papa.parse(result, { header: true, dynamicTyping: true }).data);
      };
  
      fetchData();
    }, []);

    // Filters data that will be passed to the table by roast filter
    let displayedData = [];
    if(selectedRoast === '') {
        displayedData = coffeeData;
    }
    else {
        displayedData = coffeeData.filter((singleRoast) => singleRoast.roast === selectedRoast)
    }
  
    // Library-level return to the DOM
    return (
      <div>
        <LibraryDescription/>
        <RoastSelectForm roastOptions={uniqueRoastNamesHC} filterCallback={applyFilter}/>
        <CoffeeTable data = {displayedData}/>
      </div>
    );
  }


  // Small component to set Library header and send to DOM
function LibraryDescription() {

    return(
        <div>
            <h1 className="mt-5 mb-2 text-center">Coffee Roasts</h1>
            <h2 className="fs-6 text-center">This is a library of coffee roasts taken from <a href="https://www.coffeereview.com/">coffeereview.com</a>.</h2>
        </div>
    )
}


// Roast select form component. Takes roastOptions and filterCallback as props
function RoastSelectForm(props) {

    //local state variable, tracks selected roast
    const [selectedRoast, setSelectedRoast] = useState('');
  
    // callback function to handle a change in roast, uses state hook
    const handleRoastChange = (event) => {
      const selectedRoastValue = event.target.value;
      setSelectedRoast(selectedRoastValue);
    };
  
    // handles a click, sends selected roast "up" to Library for other components to use when necessary
    const handleClick = () => {
      props.filterCallback(selectedRoast);
    };
  
    // creates option elements from available roasts
    const optionElems = props.roastOptions.map((roast, index) => {
        if(roast !== "") {
            return <option key={index} defaultValue ={roast}>{roast}</option>
        }
        else {return null;}
    })
  
    // DOM return for roast select form
    return (
      <div className="row align-items-center m-5">
        <div className="col-auto">
          <select id="teamSelect" className="form-select" defaultValue = {selectedRoast} onChange={handleRoastChange}>
            <option defaultValue = '' value=''>Select roast type</option>
            {optionElems}
          </select>
        </div>
        <div className="col-auto">
          <button id="submitButton" type="submit" className="btn btn-dark" onClick={handleClick} >Apply Filter</button>
        </div>
      </div>
    );
  }


// Coffee Table component. Takes a data prop from Library component
function CoffeeTable(props) {

    // local state variables, most of this work is taken from Problem Set 7 work
    const [sortByCriteria, setSortCriteria] = useState(null);
    const [sortedData, setSortedData] = useState([]);
    const [isAscending, setAscending] = useState(null);

    // Sorting data initially 
    useEffect(() => {
        const sortedArray = _.sortBy(props.data, [sortByCriteria]);
        setSortedData(sortedArray);
    }, [props.data, sortByCriteria]);

    // Sorting data when there is a sortby criteria
    useEffect(() => {
        if (sortByCriteria) {
        const sortedArray = _.sortBy(props.data, [sortByCriteria]);
        setSortedData(isAscending ? sortedArray : sortedArray.reverse());
        }
    }, [sortByCriteria, props.data, isAscending]);

    // Creates array of CoffeeRow's
    const rowArray = sortedData.map((coffeeObj, index) => {
        return <CoffeeRow key={index} coffeeObj = {coffeeObj}/>
      })

    // function to handle a click on the filters
    const handleClick = (event) => {
    const clickedCriteria = event.currentTarget.name;
    if(clickedCriteria !== sortByCriteria) {
        setSortCriteria(clickedCriteria);
        setAscending(true);
    }
    else if(clickedCriteria === sortByCriteria) {
        if(isAscending) {
        setAscending(false);
        }
        else if(!isAscending) {
        setAscending(null);
        setSortCriteria(null);
        }
    }
    console.log(rowArray);
    };

    // return to the dom. First row is the headers followed by an interactive filter button

    // ISSUE: Accessing the "100g_usd" attribute
    return(
        <div>
            <div className="table-responsive m-5">
            <table className="table table-hover align-middle table-striped">
                <thead>
                <tr>
                    <th className="text-left">
                    Name
                    <SortButton name="name"
                    onClick={handleClick} 
                    active={sortByCriteria === 'name'}
                    ascending={isAscending && sortByCriteria === 'name'}/>
                    </th>
                    <th className="text-left">
                    Roaster
                    <SortButton name="roaster"
                    onClick={handleClick} 
                    active={sortByCriteria === 'name'}
                    ascending={isAscending && sortByCriteria === 'name'}/>
                    </th>
                    <th className="text-left">
                    Roast
                    </th>
                    <th className="text-left">
                    Location Country
                    </th>
                    <th className="text-left">
                    Origin
                    <SortButton name="origin_1"
                    onClick={handleClick} 
                    active={sortByCriteria === 'name'}
                    ascending={isAscending && sortByCriteria === 'name'}/>
                    </th>                                              
                    <th className="text-left">
                    Price per 100g
                    <SortButton name="g_USD"
                    onClick={handleClick} 
                    active={sortByCriteria === 'g_USD'}
                    ascending={isAscending && sortByCriteria === 'g_USD'}/>
                    </th>
                    <th className="text-left">
                    Rating
                    <SortButton name="rating"
                    onClick={handleClick} 
                    active={sortByCriteria === 'name'}
                    ascending={isAscending && sortByCriteria === 'name'}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {rowArray}
                </tbody>
            </table>
            </div>
        </div>
    )
}

//Component for managing display logic of sort button
//Props: `active` [boolean] if icon should be highlighted, `ascending` [boolean] if icon should be in ascending order (flipped) `onClick` [function] click handler (passthrough)
// Taken from Problem Set 7
  function SortButton(props) {
    let iconClasses = "";
    if (props.active) {
      iconClasses += ` active`;
    }
    if (props.ascending) {
      iconClasses += ` flip`;
    }
  
    return (
      <button
        className="btn btn-sm btn-sort"
        name={props.name}
        onClick={() => props.onClick({ currentTarget: { name: props.name } })}
      >
        <span
          className={"material-icons" + iconClasses}
          aria-label={`sort by ${props.name}`}
        >
          sort
        </span>
      </button>
    );
  }

  // function for creating a CoffeeRow, used in the table component. Having a problem accessing the "100g_usd" attribute
  function CoffeeRow({ coffeeObj }) { //coffeeObj = props.coffeeObj    
    return (
      <tr>
        <td className="fs-20">{coffeeObj.name}</td>
        <td>{coffeeObj.roaster}</td>
        <td>{coffeeObj.roast}</td>
        <td>{coffeeObj.loc_country}</td>
        <td>{coffeeObj.origin_1} and {coffeeObj.origin_2}</td>
        {/* <td>{coffeeObj['100g_USD']}</td> */}
        <td>{coffeeObj.g_USD}</td>
        {/* <td>{coffeeObj.rating}</td> */}
        <td>{coffeeObj.rating}</td>

      </tr>
    );
  }