import React from 'react';
import ReactDOM from 'react-dom';

class CommentsApp extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: [
        {
          text: 'Вчера ели равиоли с каноли и торчелини с могерини. На троих заплатили всего 3 евро.' +
            ' Порции – огромные! И это в центре Рима. А шеф-повар нам с собой еще бутылку Дон Пиреньйон дал. '+
            'Бесплатно. Как же я рада, что свалила из Рашки.',
          author: 'Клавдия Челентано',
          date: '08-11-2019'
        },
        {
          text: 'Вообще-то, чтоб вы знали: анчоусы НЕЛЬЗЯ!!! заменить килькой. Будучи родственниками анчоусу, '+
            'всякие привычные нам селедки и кильки имеют СОВЕРШЕННО ИНОЙ ВКУС, и никакой заменой друг другу не '+
            'являются. Поэтому все, что вы пишете — это ПРОФОНАЦИЯ!',
          author: 'Вероника Рамзи',
          date: '08-11-2019'
        },
        {
          text: 'Каперсы.',
          author: 'Вася Пупкин',
          date: '08-11-2019'
        },
        {
          text: 'Что «каперсы»?',
          author: 'Вероника Рамзи',
          date: '08-11-2019'
        },
        {
          text: 'Я каперсы ел. Не анчоусы.',
          author: 'Вася Пупкин',
          date: '08-11-2019'
        },
        {
          text: 'Ой, да жрите вы, что хотите! Хамить-то зачем? Вам пытаются объяснить, но вы, похоже, '+
          'считаете себя самым умным. Отписываюсь.',
          author: 'Вероника Рамзи',
          date: '08-11-2019'
        }
      ],

      newComment: {
        text: '',
        author: '',
        date: ''
      }
    };
  }

  addComment(value) {
    const comments = this.state.comments;
    let date = new Date();
    let month = date.getMonth() + 1;
    let dateString = date.getDate() + '-' + month + '-' + date.getFullYear();
    comments.push({
      text: this.state.newComment.text,
      author: this.state.newComment.author,
      date: dateString
    });
    this.setState({
      comments,
      newComment: {
        text: '',
        author: '',
        date: ''
      }
    })
  }

  removeComment(key) {
    const comments = this.state.comments;
    comments.splice(key, 1);

    this.setState( { comments } );
  }

  componentDidMount() {
    localStorage.getItem('comments') && this.setState({
      comments: JSON.parse(localStorage.getItem('comments')),
      isLoading: false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('comments', JSON.stringify(this.state.comments));
  }

  render() {

    return(
      <div>
        <ul>
          {
            this.state.comments.map((comment, i) => {
              return (
                <li
                  key={i}
                >
                  <span className="author">{comment.author}</span>
                  <span className="date">{comment.date}</span>
                  <button
                    onClick={ev => {this.removeComment(i)}}
                  >Удалить комментарий</button>
                  <p className="text">{comment.text}</p>
                </li>
              )
            })
          }
        </ul>
        <p>Добавить комментарий:</p>
        <input
          type="text"
          id="comment-author-input"
          placeholder="Автор"
          required="required"
          value={this.state.newComment.author}
          onChange={ev => {
            this.setState( {newComment: {
              text: document.querySelector('#comment-text').value,
              author: ev.target.value
            }});
          }}
        />
        <textarea
          id="comment-text"
          placeholder="Текст комментария"
          value={this.state.newComment.text}
          onChange={ev => {
            this.setState( {newComment: {
              text: ev.target.value,
              author: document.querySelector('#comment-author-input').value
            }});
          }}
          onKeyUp={ev => {
            if(ev.keyCode === 13) {
              this.addComment();
            }
          }}
        />
        <input
          type="submit"
          value="Добавить комментарий"
          onClick={ev => {this.addComment();}}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentsApp />,
  document.querySelector('#comments')
);
