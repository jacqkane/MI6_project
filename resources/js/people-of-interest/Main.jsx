
import People from './People'
import '/resources/scss/Main.scss'

export default function Main() {

    return (
        <div className="main">
            <h1>Welcome to MI6</h1>
            <div className='main_content'>
                <People/>
            </div>

        </div>
    )

}

