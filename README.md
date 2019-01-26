# Project Title

countPirates

## Getting Started

1- cd Task
2- npm run server

### Prerequisites

when you hit this route "/pirates/countPirates"

```
use this token : Bearer abcdefghi
```

### Installing

npm i

## hit "/pirates"

you will get all data for pirates

```
[
    {
        "name": "Jack sparrow",
        "age": 32,
        "isCaptured": true
    },
    {
        "name": "Black beard",
        "age": 45,
        "isCaptured": false
    },
    {
        "name": "Anne Bonny",
        "age": 28,
        "isCaptured": false
    },
    {
        "name": "Ching Shih",
        "age": 69,
        "isCaptured": false
    }
]
```

## hit "/pirates/countPirates"

you will get all valid pirates faces

```
{
    "piratesFound": 1423
}
```

## Deployment

heroku link : https://task-api-mvp.herokuapp.com/

## Authors

- **Mohannad Bahaa**
