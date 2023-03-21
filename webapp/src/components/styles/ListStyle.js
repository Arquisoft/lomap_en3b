import { styled } from '@mui/system';

export const FormControl = styled('div')(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
}));

const SelectEmpty = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const Loading = styled('div')({
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const Container = styled('div')({
    padding: '25px',
});

export const MarginBottom = styled('div')({
    marginBottom: '30px',
});

const List = styled('div')({
    height: '75vh',
    overflow: 'auto',
});

export default function MyComponent() {
    return (
        <>
            <FormControl />
            <SelectEmpty />
            <Loading />
            <Container />
            <MarginBottom />
            <List />
        </>
    );
}