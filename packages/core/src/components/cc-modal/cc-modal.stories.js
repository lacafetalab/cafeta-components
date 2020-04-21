import notes from "./readme.md";
import { withKnobs } from "@storybook/addon-knobs/html";

export default { title: "Modal", decorators: [withKnobs] };

export const Modal = () => {
  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <div class="p-xxlg">
      <cc-button id="open">open modal</cc-button>

      <cc-modal id="modal">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus, mi non feugiat rutrum, turpis dolor pharetra sem, a elementum mi neque in odio. Nullam facilisis libero ut lacus molestie, sit amet malesuada urna mollis. Nunc lobortis, nibh quis hendrerit ultrices, metus velit hendrerit neque, et eleifend elit purus et ligula. Maecenas gravida dictum dictum. Nunc at iaculis risus. Donec egestas nisi a magna hendrerit, a sollicitudin lacus tristique. Aenean ornare ex in urna accumsan, vestibulum iaculis nibh vulputate.

        In eu sagittis risus. In vel felis nibh. Nunc bibendum fringilla est, sed rutrum erat lobortis sed. Sed lobortis ipsum tincidunt erat ultricies, vitae sodales mauris pulvinar. Morbi ut placerat metus, vel eleifend lacus. Aliquam ultrices velit vitae elit malesuada, sed sollicitudin dui scelerisque. Sed varius, urna nec facilisis pretium, eros risus efficitur nibh, ac bibendum eros velit finibus diam.

        Aliquam erat volutpat. Etiam sem nisi, iaculis quis ipsum eget, consequat venenatis turpis. Nulla facilisi. Duis pellentesque gravida accumsan. Vivamus eu venenatis ipsum, eget convallis orci. In eu consequat nisi, et scelerisque odio. Fusce sollicitudin varius tempor.

        In vitae pretium mauris. Aenean arcu mauris, efficitur nec malesuada vitae, imperdiet pellentesque eros. Donec mauris massa, tincidunt at semper et, elementum vel ipsum. Phasellus porta laoreet sapien non aliquet. Vivamus a nunc arcu. In egestas justo sed risus pretium mollis in at ipsum. Integer a lorem tortor. Vivamus quis sollicitudin mauris. Suspendisse eu dolor eros. Sed mollis, metus vitae ultrices aliquet, ex nibh feugiat erat, ut tincidunt tellus ex sit amet eros. Suspendisse lobortis urna vel nunc dapibus lobortis. Integer interdum ante non dui tempus, eu mattis ipsum consectetur.

        Maecenas porta justo vitae massa hendrerit lobortis. Suspendisse convallis non turpis eu cursus. Aliquam sed massa mattis, ullamcorper erat sit amet, tincidunt mi. Curabitur dictum, lorem vitae gravida scelerisque, felis lorem imperdiet lorem, sit amet laoreet tortor augue maximus enim. Sed eu ante at velit mollis dapibus. Duis vel magna nec justo mollis lacinia. Maecenas interdum vitae leo ac ornare. Phasellus aliquam facilisis libero ut semper. Curabitur varius non magna eget condimentum.

        Sed ac venenatis augue, suscipit luctus ante. Etiam ultrices, urna eu mattis posuere, est sem feugiat tellus, quis aliquam neque lorem at nunc. Mauris feugiat eget lacus a aliquet. Mauris semper turpis neque, vitae bibendum ligula lacinia et. Donec nulla felis, egestas quis malesuada sit amet, rhoncus non justo. Nullam imperdiet tortor ac ante iaculis semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam semper eu dolor vitae euismod. Nullam tempus suscipit ligula vel egestas. Aliquam lobortis leo vel ex ullamcorper vulputate. Maecenas lobortis pharetra eros, a pellentesque nibh pretium blandit. Curabitur a mauris sed elit interdum condimentum sit amet ut felis. Aenean non enim euismod, tempor orci a, ultricies augue. Pellentesque id leo sit amet augue consectetur semper.

        Vestibulum non nisl at justo gravida tempus ac eget leo. Suspendisse id dui ante. Nam accumsan rutrum erat vel rutrum. Quisque fringilla pulvinar felis, non finibus metus efficitur eget. Sed semper justo euismod erat vulputate ultrices. Donec feugiat cursus velit, quis placerat augue. Praesent faucibus dolor quis lacinia ultricies. Donec elementum sit amet enim at imperdiet. Vestibulum at turpis non velit viverra interdum. Sed libero lacus, euismod id mauris ut, varius tempus nisi. Curabitur a hendrerit nibh. Integer posuere sed mi non ultricies. Phasellus id lacinia quam.

        Nulla finibus sodales fringilla. Suspendisse nibh turpis, posuere eu finibus et, euismod sit amet lacus. Vivamus eget neque et elit malesuada euismod. Mauris iaculis lorem a commodo pellentesque. Sed non scelerisque est, sed blandit leo. Quisque nec arcu a nunc elementum laoreet. Duis ut odio a metus semper vestibulum a id ante. Integer eget finibus urna, eu interdum diam. Maecenas in odio leo. Mauris tellus turpis, faucibus id eros vitae, dignissim feugiat leo. Nam sagittis dictum neque sit amet auctor. Aliquam orci sem, tincidunt cursus luctus ac, maximus vitae sem.

        Integer vel pretium augue, nec dictum nibh. In commodo viverra mauris eget tincidunt. Cras dictum commodo lacus ut eleifend. Aliquam nunc est, vulputate at enim id, convallis pellentesque massa. Fusce sit amet augue in felis accumsan tempus. Pellentesque in facilisis enim, ac porttitor mi. Praesent ac felis maximus, aliquam nulla quis, maximus ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam pellentesque efficitur purus ac convallis. Suspendisse sed tortor diam. Integer sem velit, aliquam vitae felis quis, mattis maximus metus. Vestibulum nec venenatis lectus.

        Nunc condimentum in metus ac fermentum. Sed augue tellus, blandit at eros id, vehicula consequat sapien. Praesent non turpis felis. Cras eget venenatis mi. Pellentesque nisl quam, interdum ac ante in, lacinia ornare lacus. Vivamus turpis nisi, accumsan quis sagittis vitae, pharetra posuere dui. Proin pulvinar lectus sed aliquet porttitor.

        Aenean nec feugiat lacus, sit amet ullamcorper nunc. Proin a nulla quis quam faucibus semper. Proin consectetur eget tortor vel faucibus. Pellentesque a pulvinar lacus. Ut malesuada orci id ligula mattis varius. Sed pulvinar metus rutrum diam laoreet gravida. Maecenas molestie dictum tellus, quis sollicitudin justo pellentesque ac. Vestibulum sagittis ligula sit amet orci porttitor, a tincidunt lorem pretium. Nullam at lectus at velit euismod ornare at vel dolor. Suspendisse potenti. Suspendisse vel magna eu odio lacinia vestibulum. Fusce non odio non odio bibendum eleifend nec pretium ante. Quisque non tincidunt ligula. Cras lobortis sem posuere malesuada rutrum. Vivamus consectetur scelerisque metus vitae pretium.

        Vestibulum gravida convallis tempor. Ut fermentum nibh eros. Ut nisl nisi, consequat sed enim viverra, vestibulum dictum quam. Aliquam vitae augue ut ante venenatis blandit. Ut vehicula in orci quis viverra. Maecenas at cursus augue. Etiam varius nisl a lorem fermentum, vitae faucibus lorem aliquam. Sed faucibus quam nec augue pellentesque dapibus. Fusce nulla velit, ultrices non lectus et, consequat fermentum nisl. Suspendisse eget odio leo.

        Quisque metus augue, tristique ac mattis vel, maximus nec ligula. Nam elementum quam diam, sit amet tristique enim ultrices quis. Nam consectetur, velit vel porttitor finibus, risus est interdum velit, quis viverra justo ligula at lectus. Pellentesque hendrerit tortor diam, sed ullamcorper tortor rutrum vulputate. Nullam blandit purus non lorem interdum placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sed odio tristique dolor mollis fringilla. Ut maximus massa vitae magna ultrices sollicitudin. Quisque a lorem mi. Sed at augue ultricies odio finibus bibendum et nec ante. Aliquam in magna sit amet ipsum finibus luctus. Cras ornare lacus sit amet enim finibus molestie nec a diam.

        In eget purus ac nisi ultricies lobortis non a purus. Vestibulum vel aliquam nunc, sagittis tincidunt nulla. Nulla ut elementum nibh. Etiam ut nunc quis dolor iaculis euismod. Maecenas rutrum fringilla libero sed bibendum. Cras aliquam scelerisque egestas. Maecenas pellentesque arcu id venenatis maximus. Quisque scelerisque ut turpis vel pretium. Sed nec tortor at risus sollicitudin malesuada. Integer augue magna, eleifend eget tincidunt et, convallis non magna. Nullam laoreet tortor eget molestie finibus. Nunc in urna at purus pretium cursus ut non dui. Nunc elit velit, fringilla ac nulla vitae, consequat auctor tortor. Mauris scelerisque urna ac mauris imperdiet imperdiet. Integer a commodo ipsum, in sagittis odio.

        Cras eu semper tortor. Suspendisse feugiat, diam sed suscipit vehicula, erat urna sollicitudin magna, vel lacinia est ipsum quis libero. Ut vulputate ex at magna placerat ornare. Duis in efficitur arcu. Nunc vel ipsum metus. Integer mollis sapien eu purus vulputate, non finibus lorem bibendum. Vivamus condimentum orci massa, aliquam semper tellus accumsan vel. Ut quis aliquam justo, vel dictum nunc. Vivamus ultrices ornare diam eu lobortis. Vivamus sagittis nibh vel faucibus ullamcorper. Morbi id erat in tortor finibus consectetur. Mauris sed tellus eget sapien commodo pretium eget et nunc. Vestibulum tempus molestie est, ac luctus nibh sollicitudin eget. Vestibulum malesuada magna a ornare commodo. Integer dolor elit, rhoncus eget odio sit amet, accumsan porta dui.

        In nec libero auctor, vestibulum ipsum eget, egestas nulla. Phasellus feugiat molestie dignissim. Nullam laoreet pharetra metus non tempus. Suspendisse libero ex, auctor sollicitudin eros finibus, aliquam varius odio. Aenean hendrerit purus sodales venenatis sagittis. Proin et mollis massa. Nam finibus nec risus semper tempus. Phasellus non sollicitudin dolor.

        Curabitur vitae auctor massa, id imperdiet mauris. Morbi tincidunt lacinia elit sit amet aliquet. Mauris porttitor eleifend urna. Fusce a ante feugiat, faucibus risus at, aliquet dolor. Aliquam sit amet velit cursus, pulvinar orci quis, placerat tellus. Donec elementum erat quis tortor tempor tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi sit amet purus lacus. Pellentesque a orci ex. Sed eu nibh augue. Phasellus eleifend finibus massa, id auctor sem faucibus quis. Pellentesque lacinia ex lacus, vitae vestibulum libero placerat a. Etiam blandit, urna eget dictum dapibus, nulla turpis auctor tellus, interdum ultrices augue lacus sed purus. Suspendisse convallis metus ut erat gravida porta. Aenean consequat malesuada dui ac scelerisque.

        Sed eleifend sagittis nisi ut suscipit. In consectetur at mauris condimentum gravida. Praesent non nulla id augue vestibulum commodo nec eu justo. Integer arcu ipsum, luctus pharetra viverra at, maximus sed ipsum. Quisque eu interdum elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin quis ligula eget odio consectetur tincidunt at id quam. Praesent quis scelerisque justo. Sed non nunc sed dui volutpat condimentum. Fusce euismod purus vel consequat sollicitudin.

        Nunc auctor nunc tincidunt vulputate blandit. Mauris egestas dignissim eros a ultrices. Suspendisse erat nibh, egestas nec eros non, placerat rutrum diam. Sed aliquam neque eu elementum venenatis. Fusce lacinia venenatis molestie. Nunc pharetra augue eget purus egestas ultrices. Nulla facilisi. Praesent et libero scelerisque, vestibulum ante a, dapibus massa. In eget sollicitudin odio. Morbi tellus ipsum, tempus eget arcu ac, tincidunt fringilla justo. Vivamus non imperdiet magna. Aenean ultricies erat mattis eros faucibus venenatis quis quis erat. Nam lobortis, nunc ut placerat ultricies, tellus elit blandit dui, ut mollis velit sem ut elit. Sed cursus nibh vitae mattis consequat. Aliquam efficitur ullamcorper est, vel cursus tortor eleifend ut. Nulla quis leo pellentesque, tristique nisi ac, congue lorem.

        In sit amet est suscipit, aliquam nulla quis, eleifend augue. Nam porta ligula vel aliquet condimentum. Mauris sed ligula nulla. In in sem sed felis dapibus ultrices at sit amet libero. Praesent sed auctor velit. Cras mi metus, congue sed nunc sit amet, ornare commodo ipsum. Maecenas feugiat interdum erat, vel sodales erat pretium a. Sed id nisl urna. Mauris eget nisi condimentum, fermentum elit eget, iaculis urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean aliquam, diam vitae efficitur congue, odio dolor scelerisque dui, ut malesuada libero ipsum a metus. Proin lorem nisl, venenatis at tincidunt id, elementum quis massa. Morbi vehicula, ante at lobortis sagittis, nisl massa vestibulum ipsum, et ornare magna eros vestibulum nisi.

        Nulla pretium nisl elit. Nulla sit amet lacinia massa. Ut hendrerit orci at sem tincidunt, vulputate convallis est rutrum. In pulvinar nec sem et imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla imperdiet nulla augue, sed dignissim orci sodales euismod. Donec in lectus vitae quam tempus bibendum eget id velit. Sed scelerisque nibh vitae tellus efficitur blandit. Nam consequat velit ipsum, et convallis ex tempor et.

        Nam felis est, vehicula euismod malesuada eget, maximus id tellus. Etiam diam erat, sodales dapibus fringilla id, lobortis aliquam nulla. In semper maximus velit eget porta. Donec vitae bibendum arcu, vel tempor enim. Vivamus ornare mauris eros, in ullamcorper neque blandit ac. Nam nec magna ligula. Phasellus turpis ante, consectetur et placerat et, tempor in turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus.

        Morbi tempor sagittis nisi, eu iaculis enim rutrum eu. Nam feugiat vel erat nec placerat. Pellentesque ac rutrum turpis. Ut efficitur arcu mollis, varius nibh eu, tempor erat. Cras et ligula leo. Aenean interdum enim non dolor interdum porta eget quis metus. Aenean luctus dapibus urna id imperdiet. Donec tristique, mi at tincidunt egestas, mi nibh sagittis diam, nec accumsan lacus ex at ligula. Praesent vestibulum urna enim, at auctor erat mollis in. Aliquam tincidunt convallis lorem et rutrum. Vestibulum et est pharetra, blandit elit vel, consectetur lorem. Mauris placerat, nibh nec gravida tristique, lacus magna tristique velit, euismod mollis ipsum ipsum vitae turpis.

        Maecenas fermentum ultricies lacus id lacinia. Maecenas commodo fringilla lacus, nec ultrices est. Quisque eget nibh aliquet ipsum tempor mattis sed quis leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed egestas fringilla tortor ac rutrum. Aenean ullamcorper in nunc a pretium. Fusce vel risus lacinia, tincidunt urna sed, condimentum felis. Ut sed vehicula eros, sed lacinia magna. Duis velit odio, lacinia a congue et, laoreet eget tortor. Sed id dignissim erat. Quisque eget lectus ac quam tempor porta non ut ipsum. Integer sed dictum turpis.

        Vivamus tincidunt lacinia risus, a gravida augue lobortis at. Mauris tincidunt quis lectus blandit aliquet. Nullam vel blandit felis. Sed mollis libero ut erat iaculis, in lacinia diam placerat. Etiam eget dolor porta tortor convallis tincidunt. Vestibulum convallis sapien sed purus fringilla maximus. Pellentesque tempor blandit odio non scelerisque. Duis ante ante, vehicula nec cursus vitae, commodo eget metus. Curabitur lacinia odio lorem. Vivamus tempus eros vitae tortor hendrerit, nec lacinia quam eleifend. Aenean porttitor sit amet libero ac commodo.

        Quisque fermentum sit amet elit non aliquet. Aenean lobortis egestas risus eu interdum. Aenean posuere laoreet diam. Nullam sit amet suscipit odio. Donec imperdiet nunc at arcu facilisis ullamcorper. Nunc tincidunt nibh in lectus posuere malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse erat diam, volutpat non arcu ac, rutrum consequat elit. Suspendisse nisl nulla, aliquam nec scelerisque vel, finibus vitae diam. Suspendisse eleifend molestie ante ut viverra. Phasellus vitae tempus neque.

        Pellentesque rutrum ullamcorper nunc sed vehicula. Sed tristique metus tortor, nec sodales erat congue ac. Pellentesque dapibus, eros id efficitur pellentesque, mi mauris fringilla leo, sit amet imperdiet lorem purus eget dui. Quisque odio ipsum, auctor id mollis sed, aliquet et eros. Nunc ultricies justo vel dolor sagittis, et lobortis neque blandit. Aenean ut orci justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras tempus velit non sem malesuada molestie. Nam aliquet congue nunc id mollis. Etiam laoreet est eget consectetur lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc arcu ipsum, venenatis a rutrum sit amet, ornare vitae nisi. Nullam at vehicula metus.

        Fusce vestibulum, ipsum non tincidunt suscipit, enim nulla fringilla ligula, ut cursus libero mi cursus neque. Nullam auctor metus ac hendrerit iaculis. Maecenas pulvinar consequat purus in cursus. Cras hendrerit ante nisi, at suscipit tortor tempor et. Nulla maximus maximus dolor in consectetur. Phasellus condimentum gravida nulla, ac suscipit massa ornare sed. Vestibulum porttitor massa ut porttitor faucibus. Donec convallis est sit amet pulvinar pretium.

        Donec commodo, purus eu interdum convallis, elit sapien faucibus leo, pharetra vestibulum purus massa at nibh. Nam at malesuada erat. Quisque vel est ut purus rutrum tincidunt. Aliquam eu est eu lectus pretium auctor eget nec velit. Phasellus maximus diam diam, nec feugiat ex lobortis quis. Morbi interdum, nulla vel imperdiet venenatis, justo justo posuere leo, sed imperdiet quam sapien eget libero. Quisque aliquet et magna vitae vehicula. Duis lorem purus, egestas sed mattis vitae, pulvinar vitae magna. Aenean porttitor blandit sollicitudin. Mauris iaculis magna quis quam accumsan lobortis. Nam efficitur euismod massa ac eleifend.

        Curabitur efficitur fermentum ipsum, at tristique tellus faucibus sed. Quisque sem purus, faucibus eu malesuada et, pharetra a libero. In vel augue ornare lorem dignissim convallis. Vivamus fermentum, tellus nec congue porttitor, augue ligula finibus justo, eu hendrerit ex lorem in augue. Sed non ipsum at lorem luctus blandit vel a nulla. Vestibulum ut dolor ipsum. Donec vel elit ornare velit vulputate imperdiet ut nec enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

        Nulla nec convallis nisl. Nullam tincidunt neque a tortor pretium, vitae semper metus tincidunt. Donec ac nulla ac nisl imperdiet feugiat eget sed orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur eu quam quis dapibus. Ut tortor nisl, imperdiet vel ipsum eu, mollis pellentesque enim. Quisque quis scelerisque nunc. Curabitur ullamcorper elit sem, ac finibus enim finibus quis. Aliquam imperdiet malesuada vehicula.

        Quisque dapibus dolor in ex auctor laoreet. Pellentesque ullamcorper euismod elit ut porta. Ut quis pharetra metus. Proin rhoncus tristique commodo. Donec ac lacus justo. Fusce sit amet tincidunt nisl. Aliquam vulputate nisl sit amet dictum efficitur.

        Sed pellentesque ipsum ac lectus vestibulum imperdiet. Duis sed lectus at justo elementum scelerisque in nec augue. Nunc efficitur dui neque, ut egestas sem fringilla eget. Praesent nec consequat sapien. Aenean nunc dolor, laoreet feugiat consequat at, sagittis nec tellus. Vestibulum diam enim, lacinia non risus nec, finibus vestibulum augue. Nunc nisi quam, pharetra vel quam eu, dignissim eleifend mauris. Sed dapibus lacus turpis, et sodales erat ullamcorper at. Nullam vitae felis in velit consectetur varius. Quisque vel pellentesque libero.

        Quisque libero odio, blandit eget ligula in, fermentum facilisis mauris. Aliquam pellentesque maximus augue ut sagittis. Morbi sed nisl ut magna ornare lacinia et cursus lectus. Nunc porta tellus nisl, vel dignissim mauris fermentum et. Nullam placerat, purus sed rutrum fermentum, nibh tellus aliquam ex, feugiat eleifend mauris odio quis ante. Vestibulum ac est convallis, tristique diam id, viverra elit. Donec non lectus venenatis est commodo gravida in ut lacus. Phasellus nisl massa, egestas at arcu sed, mattis faucibus diam. Duis finibus convallis lorem, eu elementum lacus pharetra nec. Pellentesque gravida augue vel magna semper luctus. Vestibulum efficitur tempor augue id mollis. Aenean luctus leo in augue sagittis tristique. Aliquam maximus magna id dapibus vestibulum. Etiam in lorem turpis.

        Morbi at urna risus. Pellentesque tincidunt ex et risus mattis maximus. Quisque semper justo nec nisi congue, a facilisis sem egestas. Sed lobortis elementum augue, vel porttitor neque maximus non. Pellentesque sed congue tortor. Fusce ipsum magna, porta et semper et, scelerisque eu orci. Sed accumsan sapien sit amet porttitor egestas. Proin ac luctus turpis.

        Sed blandit euismod volutpat. Proin sed tempor dolor. Maecenas mattis sit amet metus a aliquet. In urna risus, fringilla ac arcu a, molestie molestie ante. Nulla eu risus nec mauris consequat euismod. Integer vitae justo et turpis placerat facilisis. Sed eu tristique libero, sit amet aliquam ex. Mauris auctor quam id est commodo, in tincidunt nulla posuere. Aliquam egestas, mi mattis blandit condimentum, neque neque tempor nulla, nec volutpat justo lectus in enim. Maecenas gravida blandit lacus. Nullam laoreet ex nec ligula gravida, mattis pretium nisl malesuada. Nam efficitur suscipit lacus mattis iaculis. Proin id lectus nisi. Duis quis nulla ut erat facilisis aliquam. Donec ut mollis lacus. In euismod sodales nisi, vitae luctus turpis placerat sed.

        Mauris tempus auctor lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec lobortis gravida aliquam. Suspendisse in feugiat nunc. Nulla nec felis non tortor condimentum consequat vitae in orci. Aliquam sit amet egestas orci. Cras ligula sem, sagittis non interdum ut, gravida eu magna. Integer fringilla mattis lectus nec tincidunt. Curabitur vehicula viverra sem, quis lobortis ipsum cursus et. Curabitur sit amet nisl in nisi ullamcorper mattis. Curabitur pretium quis tellus in molestie. Quisque fringilla eget ligula ac auctor. Aenean elementum justo at egestas sagittis. Duis luctus, ligula interdum fermentum maximus, tellus ipsum posuere ligula, fringilla iaculis quam neque eu enim.</p>
      </cc-modal>
    </div>
  `;

  const open = wrap.querySelector("#open");
  const modal = wrap.querySelector("#modal");

  open.addEventListener("click", e => {
    modal.visible = true;

    e.preventDefault();
  });

  modal.addEventListener("close", () => {
    alert("Close modal callback");
  });

  modal.addEventListener("cancel", () => {
    modal.visible = false;

    alert(
      "Cancel event fired. Triggers when press 'ESC' key, click in overlay or click in 'X' button"
    );
  });

  return wrap;
};

Modal.story = {
  parameters: {
    notes
  }
};
