import Icon from "../../../components/icon/Icon";

export default function formatSkulls(number: number) {
    return [...Array(number).keys()].map((_, index: number, array: number[]) => <Icon key={index} iconName="skull" iconSize='h2' color={array.length >= 7 ? 'red' : 'black'} />)
}