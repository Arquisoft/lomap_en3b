import { styled } from '@mui/system';

export const FormControl = styled('div')(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '20px',
}));

export const SelectEmpty = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export const Loading = styled('div')({
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const Container = styled('div')({
    padding: '25px',
    position: 'absolute',
    top: '80px', // header yüksekliğine göre değişebilir (değiştiriyoruz daha  doğrusu)
    left: '0',
    bottom: '20px',
    width: '320px', // panelin genişliği
    backgroundColor: '#ffffff', // panelin arkaplan rengi
    zIndex: '1', // header'ın arkasında kalmasını engellemek için
    borderRadius: '10px',
});

export const MarginBottom = styled('div')({
    marginBottom: '30px',
});

export const List = styled('div')({
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