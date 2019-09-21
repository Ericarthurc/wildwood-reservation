const Home = () => {
    return (
        <div className="App">
            <Navigation></Navigation>
            <ServiceForm></ServiceForm>
        </div>
    )
}

const ServiceForm = () => {
    const [serviceOne, setServiceOne] = useState([])
    const [serviceTwo, setServiceTwo] = useState([])
    const [serviceThree, setServiceThree] = useState([])
    const [radioCheck, setRadioCheck] = useState('')
    const [radioID, setRadioID] = useState()
    const [statusMessage, setStatusMessage] = useState()

    const getServices = async () => {
        try {
            const res = await axios.get('/services')
            setServiceOne(res.data[0])
            setServiceTwo(res.data[1])
            setServiceThree(res.data[2])
        } catch (e) {
            console.log(e.response.status)
        }
    }

    const radioHandler = (e, id) => {
        setRadioCheck(e.target.value)
        setRadioID(id)
    }

    const formHandler = async (e) => {
        e.preventDefault()
        console.log(e.target.elements)
        let formObj = {}
        for (let i = 3; i < (e.target.elements.length - 1); i++) {
            formObj[i] = e.target.elements[i].value
            e.target.elements[i].value = ''
        }
        setRadioCheck('')
        try {
            await axios.post('/users',
                { 'service': radioCheck, 'seats': formObj[3], 'name': formObj[4], 'email': formObj[5] })
            await axios.patch(`/services/${radioID}`, { 'serviceSeats': formObj[3] })
            getServices()
            setStatusMessage('Submitted Successfully!')
        } catch (e) {
            if (e.response.status === 400) {
                console.log(e)
                setStatusMessage('Invalid Form Input')
            } else if (e.response.status === 422) {
                setStatusMessage('This email has already been used')
                console.log(e)
            } else {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        getServices()
        setInterval(() => getServices(), 3000)
    }, [])

    return (
        <div id="form" className="App">
            <Container>
                <Form onSubmit={formHandler}>
                    <Row>
                        <Col lg={2}></Col>
                        <Col>
                            <div>
                                <p>8:00am</p>
                                <div className={radioCheck === 'ServiceOne' ? 'serviceIconClicked' : 'serviceIcon'}>
                                    <ion-icon name="cloudy"></ion-icon>
                                </div>
                                <Form.Check type="radio" value="ServiceOne" key={serviceOne._id} onChange={(e) => radioHandler(e, serviceOne._id)} checked={radioCheck === 'ServiceOne'} />
                            </div>
                            <p key={serviceOne._id}>{serviceOne.serviceSeats}</p>
                        </Col>
                        <Col>
                            <div>
                                <p>9:45am</p>
                                <div className={radioCheck === 'ServiceTwo' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                                <Form.Check type="radio" value="ServiceTwo" key={serviceTwo._id} onChange={(e) => radioHandler(e, serviceTwo._id)} checked={radioCheck === 'ServiceTwo'} />
                            </div>
                            <p key={serviceTwo._id}>{serviceTwo.serviceSeats}</p>
                        </Col>
                        <Col>
                            <div>
                                <p>11:30am</p>
                                <div className={radioCheck === 'ServiceThree' ? 'serviceIconClicked' : 'serviceIcon'}><ion-icon name="cloudy"></ion-icon></div>
                                <Form.Check type="radio" value="ServiceThree" key={serviceThree._id} onChange={(e) => radioHandler(e, serviceThree._id)} checked={radioCheck === 'ServiceThree'} />
                            </div>
                            <p key={serviceThree._id}>{serviceThree.serviceSeats}</p>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs={8} lg={6}>
                            <p className={statusMessage === 'Submitted Successfully!' ? 'successStatus' : 'errorStatus'}>{statusMessage}</p>
                            <Form.Group>
                                <Form.Control type="number" min="1" max="10" name="form2" placeholder="How many seats 1-10:"></Form.Control>
                                <Form.Control type="text" name="form3" placeholder="Enter name:"></Form.Control>
                                <Form.Control type="email" name="form4" placeholder="Enter email:"></Form.Control>
                                <button className="myButton">Submit</button>
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default Home;
