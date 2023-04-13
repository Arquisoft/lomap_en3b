import { styled } from '@mui/system';

export const FormControl = styled('div')(({ theme }) => ({
    margin: `${theme.spacing(1) / 16}rem`, // px'den rem'e dönüştürülüyor
    minWidth: `${120 / 16}rem`,
    marginBottom: `${20 / 16}rem`,
}));

export const SelectEmpty = styled('div')(({ theme }) => ({
    marginTop: `${theme.spacing(2) / 16}rem`, // px'den rem'e dönüştürülüyor
}));

export const Loading = styled('div')({
    height: `${600 / 16}rem`, // px'den rem'e dönüştürülüyor
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const Container = styled('div')({
    padding: `${25 / 16}rem`, // px'den rem'e dönüştürülüyor
    position: 'absolute',
    top: `${80 / 16}rem`,
    left: '0',
    bottom: `${20 / 16}rem`,
    width: `${320 / 16}rem`,
    backgroundColor: '#ffffff', // panelin arkaplan rengi
    zIndex: '1', // header'ın arkasında kalmasını engellemek için
    borderRadius: `${10 / 16}rem`, // px'den rem'e dönüştürülüyor
});

export const MarginBottom = styled('div')({
    marginBottom: `${30 / 16}rem`, // px'den rem'e dönüştürülüyor
});

export const List = styled('div')({
    height: `${75 * 0.01 * window.innerHeight / 16}rem`, // px'den rem'e dönüştürülüyor ve responsive olması için hesaplanıyor
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
