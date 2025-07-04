import { Component, ViewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   @ViewChild(TableComponent) tableComponent!: TableComponent;

  handleUserListCall() {
    this.tableComponent.getUserList();
  }
  onSelect(option: string) {
    console.log(`Selected: ${option}`);
  };

  products = [
    {
      img: 'https://img.freepik.com/free-vector/headphones-wireless-realistic-composition-with-isolated-image-phones-with-power-bank-dock-station-with-reflections-vector-illustration_1284-73201.jpg?uid=R178814132&ga=GA1.1.717916194.1733908841&semt=ais_hybrid',
      head: 'Wireless Earbuds,IPX8',
      price: '$80',
      para: 'Premium sound and perfect fit',
      count: '(112)',
    },
    {
      img: 'https://media.istockphoto.com/id/860853774/photo/blue-headphones-isolated-on-a-white-background.jpg?b=1&s=612x612&w=0&k=20&c=eeYvbhzJB8nP8TdHb0lSp79I8lj1F3BBA575r4bFcgA=',
      head: 'Wireless Earbuds,IPX8',
      price: '$80',
      para: 'Premium sound and perfect fit',
      count: '(112)',
    },
    {
      img: 'https://img.freepik.com/premium-photo/wireless-ear-pods-transparent-background_1029469-232625.jpg?uid=R178814132&ga=GA1.1.717916194.1733908841&semt=ais_hybrid',
      head: 'Wireless Earbuds,IPX8',
      price: '$80',
      para: 'Premium sound and perfect fit',
      count: '(112)',
    },
    {
      img: 'https://img.freepik.com/free-photo/headphones-audio-listen_1203-7566.jpg?t=st=1733983190~exp=1733986790~hmac=94ba4fbe6607cbef054587c840acb236d9a4d3b5b11123297dfa320b6e37807a&w=360',
      head: 'Wireless Earbuds,IPX8',
      price: '$80',
      para: 'Premium sound and perfect fit',
      count: '(112)',
    },
    {
      img: 'https://img.freepik.com/free-psd/technological-airpods-isolated_23-2151196891.jpg?uid=R178814132&ga=GA1.1.717916194.1733908841&semt=ais_hybrid',
      head: 'Wireless Earbuds,IPX8',
      price: '$80',
      para: 'Premium sound and perfect fit',
      count: '(112)',
    }

  ]

}
