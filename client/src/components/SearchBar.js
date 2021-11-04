import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import FormControl from "react-bootstrap/FormControl";
import "../styles/SearchBar.css";
import "bootstrap";
const SearchBar = () => {
  return (
    // <>
    //   {/* <div className="row" style={{}}>
    //     <SplitButton
    //       variant="outline-secondary"
    //       title="Action"
    //       id="segmented-button-dropdown-1"
    //       className="col-2"
    //       style={{ float: "right" }}
    //     >
    //       <Dropdown.Item href="#">Action</Dropdown.Item>
    //       <Dropdown.Item href="#">Another action</Dropdown.Item>
    //       <Dropdown.Item href="#">Something else here</Dropdown.Item>
    //     </SplitButton>
    //     <FormControl
    //       aria-label="Text input with dropdown button"
    //       style={{ width: "100%", float: "left" }}
    //       className="col"
    //     />
    //   </div> */}
    //   <div className="row searchFilter">
    //     <div class="col-sm-12">
    //       <InputGroup>
    //         <FormControl aria-label="Search" />
    //       </InputGroup>
    //     </div>
    //   </div>
    // </>
    <div class="container">
      <div class="row searchFilter">
        <div class="col-sm-12">
          <div class="input-group">
            <input
              id="table_filter"
              type="text"
              class="form-control"
              aria-label="Text input with segmented button dropdown"
            />
            <div class="input-group-btn">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="label-icon">Category</span>{" "}
                <span class="caret">&nbsp;</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <ul class="category_filters">
                  <li>
                    <input
                      class="cat_type category-input"
                      data-label="All"
                      id="all"
                      value=""
                      name="radios"
                      type="radio"
                    />
                    <label for="all">All</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="radios"
                      id="Design"
                      value="Design"
                    />
                    <label class="category-label" for="Design">
                      Design
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="radios"
                      id="Marketing"
                      value="Marketing"
                    />
                    <label class="category-label" for="Marketing">
                      Marketing
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="radios"
                      id="Programming"
                      value="Programming"
                    />
                    <label class="category-label" for="Programming">
                      Programming
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="radios"
                      id="Sales"
                      value="Sales"
                    />
                    <label class="category-label" for="Sales">
                      Sales
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="radios"
                      id="Support"
                      value="Support"
                    />
                    <label class="category-label" for="Support">
                      Support
                    </label>
                  </li>
                </ul>
              </div>
              <button
                id="searchBtn"
                type="button"
                class="btn btn-secondary btn-search"
              >
                <span class="glyphicon glyphicon-search">&nbsp;</span>{" "}
                <span class="label-icon">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
