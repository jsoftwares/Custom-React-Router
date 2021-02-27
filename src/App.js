import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Translate from './components/Translate';
import Dropdown from './components/Dropdown';
import Route from './components/Route';
import Header from './components/Header';

const items = [
  {
    id: 1,
    title: 'What is React?',
    content: 'React is a JavaScript frontend framework'
  },
  {
    id: 2,
    title: 'Why do people learn React?',
    content: 'React is popular and favourite JavaScript frontend framework.'
  },
  {
    id: 3,
    title: 'What is the best wat to learn React?',
    content: 'Do a alot of projects as you can, continous learning is key.'
  }
];

// This can be defined inside or outside the component as it will not change
const options = [
  {
    label: 'The Color Red',
    value: 'red'
  },
  {
    label: 'The Color Green',
    value: 'green'
  },
  {
    label: 'A Shade of Blue',
    value: 'blue'
  }
];

export default () => {

  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="ui container">
      <Header />
      <Route path='/'>
        <Accordion items={items} />
      </Route>
      <Route path='/list'>
        <Search />
      </Route>
      <Route path='/dropdown'>
        <Dropdown 
          label='Select a Color'
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path='/translate'>
        <Translate />
      </Route>
    </div>
  );
}


