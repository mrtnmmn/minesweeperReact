import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

import '../Css/Footer.css'

function Footer() {
    return (  
        <div className="footerMainDiv">
            <div>©mrtnmmn  -  <FontAwesomeIcon icon={faTwitter}/>: @_mrtnmmn - <FontAwesomeIcon icon={faGithub}/>: @mrtnmmn</div>
        </div>
    );
}

export default Footer;