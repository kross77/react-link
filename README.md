## React link
----

### About
Link is simple but very powerful pattern for react hook development.
The idea is put the update function and value into one object.

The simple example is stupid, but you could see how the general idea works

```tsx
import {useSingleLink} from '@kross77/react-links'

const User = () => {
 const nameLink = useSingleLink('');
 return <div>
    <h2>User name: ${nameLink.value}</h2>
    <input onChange={e => nameLink.set(e.target.value)}/>
</div>
}
```

The awesome part starting when you know what object type do you have, 
and put routine operation to the link for example 

```tsx
import {useObjectLink} from '@kross77/react-link'

const User = () => {
 const formLink = useObjectLink({first: "", last: ""});
 return <div>
    <h2>User name: ${formLink.value.first}  ${formLink.value.last}</h2>
    <input onChange={e => formLink.update({first: e.target.value})}/>
    <input onChange={e => formLink.update({last: e.target.value})}/>
</div>
}
```
or 

```tsx
import {useObjectLink} from '@kross77/react-link'

const User = () => {
 const formLink = useObjectLink({first: "", last: ""});
 return <div>
    <h2>User name: ${formLink.value.first}  ${formLink.value.last}</h2>
    <input onChange={formLink.inputCb('first')}/>
    <input onChange={formLink.inputCb('last')}/>
</div>
}
```


### Documentation
Now the source code not more than 100 lines and everything into one file, so you
could overview ``src/index.ts``

Work in progress...
