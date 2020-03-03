import React from "react";
import "./assets/css/bootstrap.min.css";
import "./assets/css/now-ui-kit.css";
import { Button, Badge, Modal, Form, FormGroup, Input } from "reactstrap";

const Link = props => (
  <tr>
    <td>
      <Badge color='info' href={props.link.content} target='_blank'>
        {props.link.title}
      </Badge>
    </td>
    <td>
      <Button color='danger' size='sm' onClick={props.onDelete}>
        Delete
      </Button>
    </td>
  </tr>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      links: [],
      modalLive: false,
      setModalLive: false
    };
    this.test = this.test.bind(this);
    this.show();
  }

  show() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch("http://maimien.me:9000/saves/get", {
      mode: "cors",
      method: "GET",
      headers: headers
    })
      .then(response => response.json())
      .then(response =>
        this.setState({
          links: response
        })
      )
      .catch(error => console.log("error", error));
  }

  add = (title, content) => {
    let headers = new Headers();

    let link = JSON.stringify({ title: title, content: content });

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch("http://maimien.me:9000/saves/add", {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: link
    })
      .then(response => response.json())
      .then(response =>
        this.setState({
          links: [...this.state.links, response]
        })
      )
      .catch(error => console.log("error", error));
  };

  remove(id) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch("http://maimien.me:9000/saves/delete/" + id, {
      mode: "cors",
      method: "POST",
      headers: headers
    }).catch(error => console.log("error", error));

    this.setState({
      links: this.state.links.filter(link => link.id !== id)
    });
  }

  setModalLive = () => {
    if (this.state.modalLive)
      this.setState({
        modalLive: false
      });
    else {
      this.setState({
        modalLive: true
      });
    }
  };

  test(e) {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    this.add(title, content);
    this.setModalLive();
  }

  render() {
    return (
      <div className='link-list'>
        <table>
          <th>Link</th>
          <th>Action</th>
          <tbody>
            {this.state.links.map(alink => (
              <Link
                key={alink.id}
                onDelete={() => this.remove(alink.id)}
                link={alink}
              ></Link>
            ))}
          </tbody>
        </table>
        <Button
          color='default'
          size='md'
          type='button'
          onClick={() => this.setModalLive()}
        >
          Add
        </Button>

        <Modal toggle={() => this.setModalLive()} isOpen={this.state.modalLive}>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLiveLabel'>
              Add new Link
            </h5>
            <button
              aria-label='Close'
              className='close'
              type='button'
              onClick={() => this.setModalLive()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.test}>
            <FormGroup>
              <div className='modal-body'>
                <label>Title</label>
                <Input className='form-control-success' type='text'></Input>
                <br />
                <label>Link</label>
                <Input className='form-control-success' type='text'></Input>
              </div>
              <div className='modal-footer'>
                <Button
                  color='secondary'
                  type='button'
                  onClick={() => this.setModalLive()}
                >
                  Close
                </Button>
                <Button color='primary'>Add</Button>
              </div>
            </FormGroup>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default App;
