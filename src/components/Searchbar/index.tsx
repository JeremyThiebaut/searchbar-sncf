import React from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./style.scss";

const Searchbar: React.FC = () => {
  return (
    <div className="searchbar">
      <div className="container">
        <form className="formstyle">
          <input
            className="textstyle"
            placeholder="Une destination, demande..."
            type="text"
          />
          <div className="allcontent">
            <button className="submitstyle" type="submit">
              <Icon className="iconsubmit" name="search" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
