import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Component } from 'react';
import { getPhotosByKey } from '../js/API';
import { Notify } from 'notiflix';
import { Loader } from './Loader/Loader';
import { PER_PAGE } from '../js/global_const';
import { Modal } from './Modal/Modal';
import { createPortal } from 'react-dom';

export class App extends Component {
  state = {
    imgList: [],
    page: 1,
    search: '',
    isLoading: false,
    isFinished: false,
    modalIsOpen: false,
    modalImage: ' ',
  };

  toggleOpenModal = photo => {
    console.log('asdasd');
    this.setState(prev => ({
      modalIsOpen: !prev.modalIsOpen,
      modalImage: photo,
    }));
  };

  checkEndOfHits(list) {
    if (list.length < PER_PAGE) this.setState({ isFinished: true });
  }

  loadPhotos = async search => {
    if (search) {
      await this.setState({
        imgList: [],
        isFinished: false,
        page: 1,
      });

      if (!search.trim()) {
        Notify.failure('Please enter something in search field');
        return;
      }
    } else {
      search = this.state.search;
    }

    this.setState({ isLoading: true });

    try {
      const items = await getPhotosByKey(search, this.state.page);
      this.checkEndOfHits(items);

      if (items.length === 0) {
        Notify.warning("Sorry we didn't find anything");
        return;
      }

      this.setState(prev => ({
        imgList: [...prev.imgList, ...items],
        search,
      }));
      this.setState(prev => ({ page: prev.page + 1 }));
    } catch (err) {
      Notify.failure('Oops!! Something goes wrong please try again');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, imgList, isFinished, modalIsOpen, modalImage } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.loadPhotos} />
        <ImageGallery
          imgList={imgList}
          toggleOpenModal={this.toggleOpenModal}
        />
        {isLoading && <Loader />}
        {!!imgList.length && !isFinished && (
          <Button
            loadMore={() => {
              this.loadPhotos();
            }}
          />
        )}

        {modalIsOpen &&
          createPortal(
            <Modal
              img={modalImage}
              alt={'asdasd'}
              closeModal={this.toggleOpenModal}
            />,
            document.getElementById('modal-root')
          )}
      </>
    );
  }
}
