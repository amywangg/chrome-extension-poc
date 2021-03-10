import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardSection,
  CardFooter,
  CardInfo,
} from '../../components/card';
import { Selector } from '../../components/emoji-selector';
import { Selector as TagSelector } from '../../components/tag-selector';
import UserSelector from '../../components/user-selector';
import { Button, ButtonContainer } from '../../components/button';
// import ApiService from '../../services/api';
// import { getCodeGemCookies } from './services/getCookies';

import FeedbackValidator from './modules/validators';
import { Container } from '../../components/container';
import styled from '@emotion/styled';
import { Textarea } from '../../components/textarea';
import { Toast } from '../../components/center-toast';

let div = document.createElement('div');
const source = window.location.href;

const CustomContainer = styled(Container)`
  min-height: 50px;
  margin-top: 10px;
`;

const CustomTextArea = styled(Textarea)`
  margin-top: 10px;
  height: 80px;
`;

const App = () => {
  const api = 'http://localhost:3000/api';
  let [tags, setTags] = useState([
    { name: 'Mentorship' },
    { name: 'Collaboration' },
    { name: 'Feedback' },
    { name: 'Impactful Work' },
    { name: 'Kind Words' },
    { name: 'Learning' },
    { name: 'Other' },
  ]);
  let [selectedTag, setSelectedTag] = useState(null);
  let [moods, setEmoji] = useState([]);
  let [feedback, setFeedback] = useState('');
  let [saving, setSaving] = useState(false);
  let [errors, setErrors] = useState(null);
  let [showSuccess, setShowSuccess] = useState(false);

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    // ADD IN ENV VAR ${API_URL}
    console.log(request.message);
    // axios
    // .request({
    //   method: 'get',
    //   url: `${api}/user/verify`,
    //   withCredentials: true,
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   return resolve(response.data);
    // });
    return new Promise(function (resolve, reject) {
      // const client = axios.create({ withCredentials: true });
      axios
        .request({
          method: 'get',
          url: `${api}/user/verify`,
          withCredentials: true,
          headers: {
            Cookie: `${request.message.name}=${request.message.value}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          return resolve(response.data);
        });
      // return fetch(`${api}/user/verify`, { credentials: 'include' }).then(
      //   (res) => {
      //     console.log(res);
      //   }
      // );
      //   client
      //     .get(`${api}/user/verify`, {
      //       cookie: request.message,
      //     })
      //     .then((response) => resolve(response.data));
    }).then((result) => {
      return result;
    });
  });

  const onUserSelected = (tag, user) => {
    tag.tagged_user.push(user);
    setTags([...tags]);
  };

  const onTagClicked = (tag) => {
    setSelectedTag((prevSelectedTag) => {
      return prevSelectedTag !== null ? null : tag;
    });
    tag.active = !tag.active;
    setTags([...tags]);
  };

  const removeEmoji = (emoji) => {
    let idx = moods.indexOf(emoji);
    moods.splice(idx, 1);
    setEmoji([...moods]);
  };

  const addEmoji = (emoji) => {
    if (moods.indexOf(emoji) < 0) {
      moods.push(emoji);
      setEmoji([...moods]);
    }
  };

  const removeTag = (tag) => {
    onTagClicked(tag);
  };

  const submitForm = () => {
    let formValid = FeedbackValidator.validate(feedback, moods, tags);
    setErrors(null);

    // if (formValid.valid) {
    //   setSaving(true);
    //   ApiService.post('/feedback', {
    //     moods: moods.map((e) => e.display),
    //     tags: tags.filter((t) => t.active),
    //     feedback,
    //     source,
    //   }).then(() => {
    //     setSaving(false);
    //     setEmoji([]);
    //     setTags([
    //       ...tags.map((t) => {
    //         t.active = false;
    //         return t;
    //       }),
    //     ]);
    //     setFeedback('');
    //     setShowSuccess(true);

    //     setTimeout(() => setShowSuccess(false), 1000);
    //   });
    // } else {
    //   setErrors(formValid);
    // }
  };

  // getCodeGemCookies('http://localhost:3001/*');

  return (
    <Card>
      <Toast
        content="Your feedback has been submitted successfully."
        show={showSuccess}
      />
      <CardHeader dismissible>Let's Reflect.</CardHeader>
      <CardBody>
        <CardSection>
          <CardInfo>How are you feeling now?</CardInfo>
          <Selector
            selected={moods}
            onEmojiRemoved={removeEmoji}
            addEmoji={addEmoji}
            error={errors && !errors.moods}
          />
        </CardSection>
        <CardSection>
          <CardInfo>What inspired that?</CardInfo>
          <Container flex>
            <TagSelector
              dismissOverride={false}
              onTagClicked={onTagClicked}
              selected={tags}
            />
            <UserSelector
              selectedTag={selectedTag}
              onUserSelected={onUserSelected}
            />
          </Container>
        </CardSection>
        <CardSection>
          <CardInfo>Your findings</CardInfo>
          <CustomContainer bordered>
            <TagSelector
              dismissOverride={true}
              onTagRemoved={removeTag}
              selected={tags.filter((t) => !!t.active)}
            />
          </CustomContainer>
        </CardSection>
        <CardSection>
          <CardInfo>Would you like to share more?</CardInfo>
          <CustomTextArea
            bordered
            full
            error={errors && !errors.feedback}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </CardSection>
      </CardBody>
      <CardFooter>
        <ButtonContainer>
          <Button primary disabled={saving}>
            My Diary
          </Button>
          <Button onClick={submitForm} disabled={saving}>
            Submit
          </Button>
        </ButtonContainer>
      </CardFooter>
    </Card>
  );
};

// add form to the page
div.id = 'code-gem';
// allow user to dismiss the feedback form
let listener = div.addEventListener('click', (e) => {
  if (e.target.className.indexOf('card-dismiss') >= 0) {
    div.style.transform = 'translateX(370px)';
    div.removeEventListener('click', listener);
  }
});

document.body.appendChild(div);
ReactDOM.render(<App />, div);
