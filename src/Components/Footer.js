import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

import '../Css/Footer.css'

//<FontAwesomeIcon icon={faTwitter}/>: @_mrtnmmn - 

function Footer() {
    return (  
        <div className="footerMainDiv">
            <div>©mrtnmmn 2022  -  <FontAwesomeIcon icon={faGithub}/>: <a className='links' href='https://github.com/mrtnmmn/minesweeperReact'>@mrtnmmn</a></div>
        </div>
    );
}

export default Footer;